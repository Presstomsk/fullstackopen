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
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
      <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
      <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
    </>
  );
}

const Total = (props) => { 
  console.log(props);
  return (
    <> 
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {//use objects
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course = {course}/> 
      <Content parts = {parts}/>      
      <Total parts = {parts}/>
    </div>
  )
}

export default App
