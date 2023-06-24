const Header = ({course}) => <h1>{course.name}</h1>    

const Part = ({part, exercises}) => <p>{part} {exercises}</p>   

const Content = ({course}) => course.parts.map(part => <Part key={part.id} part = {part.name} exercises = {part.exercises}/>) // map function

const Total = ({course}) => { 
  let initialValue = 0;
  return (//reduce function
    <> 
      <p><strong>Total of {course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)} exercises</strong></p> 
    </>
  );
}

const Course = ({course}) => <><Header course={course}/><Content course={course}/><Total course={course}/></>      

const App = () => {   
  const courses = [{
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]
  return courses.map(course => <Course key={course.id} course={course}/>)
}

export default App
 