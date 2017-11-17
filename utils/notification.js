import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './db'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification(){
  return {
    title : 'Quiz Reminder',
    body : 'Don\'t forget to study today',
    android : {
      sound : true,
      sticky : false,
      vibrate : true,
      priority : 'high'
    }
  }
}

export function setLocalNotification(){
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              AsyncStorage.getItem(DECK_STORAGE_KEY).then(data => {

                const deckInfo = JSON.parse(data)
                const cardDeck = Object.values(deckInfo)

                let isStudy = false
                let today = new Date()
                let cardDate = null

                for (const card of cardDeck){
                  cardDate = new Date(card.timestamp)
                  if(cardDate.getDate() === today.getDate()){
                    isStudy = true
                  }
                }

                if(!isStudy){
                  Notifications.scheduleLocalNotificationAsync(
                    createNotification(),
                    {
                      time: today,
                      repeat: 'day',
                    }
                  )

                  AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }

              }).catch(error => {
                alert('An error occured while fetching data')
              })

            }
          })
      }
    })
}
