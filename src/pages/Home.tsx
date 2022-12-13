import { useHistory } from 'react-router'

import IllustrationImg from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import GoogleIcon from '../assets/images/google-icon.svg'

import '../style/auth.scss'
import { Button } from '../components/Button' 

import { auth, firebase } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
const history = useHistory()
const {user, signInWithGoogle} = useAuth()
const [roomCode, setRoomCode] = useState('')

async function handleCreateRoom(){
  if(!user){
    await signInWithGoogle()
  }
  history.push('/rooms/new')
}

async function handleJoinRoom(event: FormEvent) {
  event.preventDefault();

  if (roomCode.trim() === '') {
    return;
  }

  const roomRef = await database.ref(`rooms/${roomCode}`).get();

  if (!roomRef.exists()) {
    alert('Room does not exists.');
    return;
  }

  history.push(`/rooms/${roomCode}`);
}

 return(
   <div id='page-auth'>
    <aside>
    <img src={IllustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
    <strong>Crie salas Q&amp; A ao-vivo</strong>
    <p>Tire as dúvidas de sua audiência em tempo-real</p>
    </aside>
     <main>
     <div className='main-content'>
      <img src={LogoImg} alt="Letmeask" />
      <button onClick={handleCreateRoom} className='create-room'>
       <img src={GoogleIcon} alt="Ícone do Google" className='imgdogoogle'/>      
       Crie sua sala com o Google!
      </button>
      <div className="separator">
       Ou entre em uma salas
      </div>
      <form onSubmit={handleJoinRoom}>
       <input 
        type="text" 
        placeholder="Digite o código da sala"
        onChange={(event) => setRoomCode(event.target.value)}
        value={roomCode}
       />
       <Button type="submit">
         Entrar na sala
       </Button>
      </form>
     </div>
     </main>
   </div>
)
}