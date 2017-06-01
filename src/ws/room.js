import {rootSocket} from './connect'
import Rx from 'rxjs'



export const getRooms$ = Rx.Observable.create(observer => {
    rootSocket.on('getRooms', data => {
        observer.next(data)
    })
    rootSocket.emit('getRooms')
})

export const joinRoom$ = Rx.Observable.create(observer => {
    rootSocket.emit('joinRoom', (msg) => {
        observer.next(msg)
    })
})

export const createRoom$ = Rx.Observable.create(observer => {
    rootSocket.emit('createRoom', (msg) => {
        observer.next(msg)
        rootSocket.emit('getRooms')
    })
})

// export const getRooms$ = (() => {
//     const subject = new Rx.Subject()
//     rootSocket.on('getRooms', data => {
//         console.log(data, 'fuck')
//         subject.onNext(data)
//     })
//     return subject
// })()