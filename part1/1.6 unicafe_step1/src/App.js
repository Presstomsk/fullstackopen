import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>//Destructuring

const Button = ({handler, title}) => <button onClick={handler}>{title}</button>

const Result = ({title, value}) =><p>{title} {value}</p> 

const App = () => {
  const title1 = "give feedback" //consts
  const title2 = "statistics"
  const goodButtonName = "good"
  const neutralButtonName = "neutral"
  const badButtonName = "bad"
  const checkGood = () => setGood(good + 1) //event handlers
  const checkNeutral = () => setNeutral(neutral + 1)
  const checkBad = () => setBad(bad + 1)

  // save clicks of each button to its own state
  const [good, setGood] = useState(0) //useState hooks
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title={title1}/>
      <Button handler={checkGood} title={goodButtonName}/>
      <Button handler={checkNeutral} title={neutralButtonName}/>
      <Button handler={checkBad} title={badButtonName}/>
      <Title title={title2}/>
      <Result title={goodButtonName} value={good}/>
      <Result title={neutralButtonName} value={neutral}/>
      <Result title={badButtonName} value={bad}/>
    </div>
  )
}

export default App