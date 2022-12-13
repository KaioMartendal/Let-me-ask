import '../Question/style.scss'

type QuestionProps ={
     content: string
     author:{
          name: string,
          avatar: string
     }
}

import './style.scss'; 

export function Question({
     content,
     author,
}: QuestionProps){

     return (
          <div className="Question">
               <p>{content}</p>
          <footer>
               <div>
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
               </div>
               <div>
                    
               </div>
      </footer>
    </div>
     )
}