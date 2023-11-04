function Component1({title, description, date, location}){
    return(
      <>
        <h1>
            {title}
        </h1>

        <p>
            {description}
        </p>

        <p>
            {date}
            <br />
            {location}
        </p>
      </>
    );
}

export default Component1;