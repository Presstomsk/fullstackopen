const Header = (props) => { //props
  console.log(props);
  return (//fragment
    <> 
    <h1>{props.course}</h1>
    </>
  );
}

const Part = (props) => { 
  console.log(props);
  return (
    <> 
      <p>{props.part} {props.exercises}</p>
    </>
  );
}

const Content = (props) => { 
  console.log(props);
  return (
    <> 
      <Part part = {props.parts[0]} exercises = {props.exercises[0]}/>
      <Part part = {props.parts[1]} exercises = {props.exercises[1]}/>
      <Part part = {props.parts[2]} exercises = {props.exercises[2]}/>
    </>
  );
}

const Total = (props) => { 
  console.log(props);
  return (
    <> 
      <p>Number of exercises {props.exercises[0] + props.exercises[1] + props.exercises[2]}</p>
    </>
  );
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (//send props to components, send array as props
    <div>
      <Header course = {course}/> 
      <Content parts = {parts} exercises = {exercises}/>      
      <Total exercises = {exercises}/>
    </div>
  )
}

export default App
