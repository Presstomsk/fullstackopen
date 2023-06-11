import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>//Destructuring

const Button = ({handler, title}) => <button onClick={handler}>{title}</button>

const StatisticLine = ({title, value}) =><p>{title} {value}</p> 

const Positive = (all, good) => good*100/all

const Avg = (stat) => {
  let sum = 0;
  stat.forEach(element => {
    sum += element  
  });

  let avg = sum/stat.length
  return avg
}

// a proper place to define a component
const Statistics = ({states, sets}) => {

  const title1 = "give feedback" //consts
  const title2 = "statistics"
  const goodButtonName = "good"
  const neutralButtonName = "neutral"
  const badButtonName = "bad"
  const allName = "all"
  const avgName = "average"
  const positiveName = "positive"

  const good = states[0]
  const neutral = states[1]
  const bad = states[2]
  const all = states[3]
  const stats = states[4]

  const setGood = sets[0]
  const setNeutral = sets[1]
  const setBad = sets[2]
  const setAll = sets[3]
  const setStat = sets[4]

  const checkGood = () => {//event handlers
    setGood(good + 1) 
    setAll(all + 1)
    setStat(stats.concat(1))
  }
  const checkNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setStat(stats.concat(0))
  }
  const checkBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setStat(stats.concat(-1))
  } 
  
  if(all === 0) //Conditional rendering
  {
    return(
       <>
      <Title title={title1}/>
      <Button handler={checkGood} title={goodButtonName}/>
      <Button handler={checkNeutral} title={neutralButtonName}/>
      <Button handler={checkBad} title={badButtonName}/>
      <Title title={title2}/>
      <p>No feedback given</p>
    </>
    )
  }

  return (
    <>
      <Title title={title1}/>
      <Button handler={checkGood} title={goodButtonName}/>
      <Button handler={checkNeutral} title={neutralButtonName}/>
      <Button handler={checkBad} title={badButtonName}/>
      <Title title={title2}/>
      <StatisticLine title={goodButtonName} value={good}/>
      <StatisticLine title={neutralButtonName} value={neutral}/>
      <StatisticLine title={badButtonName} value={bad}/>
      <StatisticLine title={allName} value={all}/>
      <StatisticLine title={avgName} value={Avg(stats)}/>
      <StatisticLine title={positiveName} value={Positive(all, good)}/>
    </>
  )
}

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0) //useState hooks
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [stat, setStat] = useState([])
  const allStatsParams = [good, neutral, bad, all, stat]
  const allSetParams = [setGood, setNeutral, setBad, setAll, setStat]

  return (
    <div>
      <Statistics states={allStatsParams} sets={allSetParams}/>
    </div>
  )
}

export default App