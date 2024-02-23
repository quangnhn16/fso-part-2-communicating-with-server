const Title = ({ text }) => {
    return <h2>{text}</h2>;
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part, index) => <p key={index}>{part.name} {part.exercises}</p>)}
        </>
    )
}

const Total = ({ parts }) => {
    let numExercises = parts.reduce(
        (total, part) => total + part.exercises,
        0,
    );
    return <p><strong>total of {numExercises} exercises</strong></p>
}

const Course = ({ course }) => {
    return (
        <div>
            <Title text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;