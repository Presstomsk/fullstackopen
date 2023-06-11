import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>//Destructuring

const Button = ({handler, title}) => <button onClick={handler}>{title}</button>

const Result = ({title, value}) =><p>{title} {value}</p> 

const Avg = ({title, stat}) => {
  let sum = 0;
  stat.forEach(element => {
    sum += element  
  });

  let avg = sum/stat.length

  return (
    <Result title={title} value={avg}/>
  )
}

const Positive = ({title, all, good}) => <Result title={title} value={good*100/all}/>

const App = () => {
  const title1 = "give feedback" //consts
  const title2 = "statistics"
  const goodButtonName = "good"
  const neutralButtonName = "neutral"
  const badButtonName = "bad"
  const allName = "all"
  const avgName = "average"
  const positiveName = "positive"
  const checkGood = () => {//event handlers
    setGood(good + 1) 
    setAll(all + 1)
    setStat(stat.concat(1))
  }
  const checkNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setStat(stat.concat(0))
  }
  const checkBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setStat(stat.concat(-1))
  }
  

  // save clicks of each button to its own state
  const [good, setGood] = useState(0) //useState hooks
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [stat, setStat] = useState([])

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
      <Result title={allName} value={all}/>
      <Avg title={avgName} stat={stat}/>
      <Positive title={positiveName} all={all} good={good}/>
    </div>
  )
}

export default App