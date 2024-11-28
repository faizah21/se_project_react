import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getweather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey, baseUrl } from "../../utils/constants";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import Api from "../../utils/api";
import EditProfileModal from "../ModalWithForm/EditProfileModal";
import Auth from "../../utils/auth";
import LoginModal from "../ModalWithForm/LoginModal";
import RegisterModal from "../ModalWithForm/RegisterModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

// Create an instance of the Api class
const api = new Api({
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const auth = new Auth({ headers: { "Content-Type": "application/json" } });

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    avatar: "",
    _id: "",
    token: "",
  });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onClose = () => {
    setActiveModal("");
    setIsConfirmationModalOpen(false);
    setErrorMessage("");
  };

  const handleEditProfileModalClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignInModalClick = () => {
    setActiveModal("sign-in");
  };

  const handleSignUpModalClick = () => {
    setActiveModal("sign-up");
  };

  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSignUp = ({ name, avatar, email, password }) => {
    const makeRequest = () => {
      return auth.signUp({ name, avatar, email, password }).then((res) => {
        setCurrentUser({
          name: res.name,
          avatar: res.avatar,
          _id: res._id,
        });
        navigate("/profile");
      });
    };

    handleSubmit(makeRequest);
  };

  const handleSignIn = ({ email, password }) => {
    const makeRequest = () => {
      if (!email || !password) {
        setErrorMessage("Email and password are required");
        return Promise.reject(new Error("Email and password are required"));
      }

      return auth
        .signIn({ email, password })
        .then((data) => {
          localStorage.setItem("jwt", data.token);
          return auth.getUser(data.token);
        })
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
          navigate("/profile");
        });
    };

    handleSubmit(makeRequest);
  };

  const handleUpdateUser = ({ name, avatar, _id }) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return auth.updateUser({ name, avatar, _id }, token).then((user) => {
        setCurrentUser(user);
      });
    };

    handleSubmit(makeRequest);
  };
  const handleCheckToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      return auth
        .getUser(token)
        .then((user) => {
          setCurrentUser(user);
          console.log(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsLoggedInLoading(false));
    } else {
      setIsLoggedInLoading(false);
    }

    return token;
  };
  useEffect(() => {
    handleCheckToken();
  }, []);

  const handleCardLike = (id, isLiked) => {
    if (!isLoggedIn) return;
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      const action = isLiked ? api.removeLike : api.addLike;

      return action(id, token).then((newClothingItems) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? newClothingItems : item))
        );
      });
    };

    handleSubmit(() => makeRequest());
  };

  const handleAddItemSubmit = (item) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return api.addItem(item, token).then((res) => {
        setClothingItems((prevClothingItems) => [
          res.data,
          ...prevClothingItems,
        ]);
      });
    };

    handleSubmit(makeRequest);
  };
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleLogOff = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleItemDelete = () => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return api.deleteItem(selectedCard._id, token).then(() => {
        const newClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(newClothingItems);
      });
    };

    handleSubmit(makeRequest);
  };
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getweather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={handleSignUpModalClick}
              onLoginClick={handleSignInModalClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleEditProfileModalClick={handleEditProfileModalClick}
                      handleLogOff={handleLogOff}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <AddItemModal
              onClose={onClose}
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              clothingItems={clothingItems}
              buttonText={isLoading ? "Saving..." : "Save Garment"}
            />
            <ItemModal
              card={selectedCard}
              onClose={onClose}
              isOpen={activeModal === "preview"}
              onDelete={openConfirmationModal}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              updateUser={handleUpdateUser}
              onClose={onClose}
              buttonText={isLoading ? "Saving..." : "Save Changes"}
            />
            <RegisterModal
              onClose={onClose}
              isOpen={activeModal === "sign-up"}
              onRegister={handleSignUp}
              onLoginClick={handleSignInModalClick}
            />
            <LoginModal
              onClose={onClose}
              isOpen={activeModal === "sign-in"}
              onLogin={handleSignIn}
              onRegisterClick={handleSignUpModalClick}
              errorMessage={errorMessage}
              onLoginClick={handleSignInModalClick}
            />
            <DeleteConfirmationModal
              onDelete={selectedCard}
              onCancel={onClose}
              onConfirm={handleItemDelete}
              isOpen={isConfirmationModalOpen}
              onClose={onClose}
            />
          </div>
          <Footer />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
