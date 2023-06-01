import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { api } from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'

export const App = () => {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleEditAvatarClick = () => setisEditAvatarPopupOpen(true);
    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleCardClick = (card) => setSelectedCard(card);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const updateCards = cards.map(c => c._id === newCard._id ? newCard : c)
                setCards(updateCards);
            })
            .catch((err) => {
                console.error(err);
            })

    }
    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                const updateCards = cards.filter((c) => card._id !== c._id);
                setCards(updateCards);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);


    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setisEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    const handleUpdateUser = (user) => {
        api.editUserInfo(user)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleUpdateAvatar = (avatar) => {
        api.editUserAvatar(avatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                setisEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    const handleAddPlace = (card) => {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="page">
            <div className="content">
                <CurrentUserContext.Provider value={currentUser}>
                    <Header />
                    <Main cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer />
                    <PopupWithForm
                        formName={'confirm'}
                        formTitle={'Вы уверены?'}
                        onClose={closeAllPopups}
                        buttonText={'Да'}
                    >
                    </PopupWithForm>
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </CurrentUserContext.Provider>
            </div>
        </div>
    )
}