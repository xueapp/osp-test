window.onload = () => {
  // microservice1 - Books
  const microservicePort = {
    // 3000: 'Frontend',
    8888: 'Books',
    // 7777: 'Orders',
    5555: 'Customers',
  };

  // sets the title of the page to whatever port you're currently on
  document.title = microservicePort[window.location.port];

  // create a display that when clicked will grab the books passed in
  //  and send it to the database to be stored
  document.getElementById('create1').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();

    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    document.getElementById('container').appendChild(newDisplay);

    const title = document.getElementById('field_A1').value;
    const author = document.getElementById('field_B1').value;
    const numberOfPages = document.getElementById('field_C1').value;
    const publisher = document.getElementById('field_D1').value;

    if (!title || !author || !numberOfPages || !publisher) {
      return alert('Every Books field must be completed');
    }

    let book = {
      title,
      author,
      numberOfPages,
      publisher,
    };

    book = JSON.stringify(book);
    fetch('http://localhost:8080/books/createbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: book,
    })
      .then(res => res.json())
      //  display the result of the action just taken
      .then(data => {
        const newEntry = document.createElement('li');
        newEntry.innerHTML = `CREATED: ${data.title}`;
        document.getElementById('display').appendChild(newEntry);
      });
  });

  // read functionality
  document.getElementById('read1').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();

    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of books';
    document.getElementById('container').appendChild(newDisplay);
    fetch('http://localhost:8080/books/getbooks', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const bookInDb = data[i];

          newEntry.innerHTML = `READ: ${bookInDb.title}`;
          document.getElementById('display').appendChild(newEntry);

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Delete';
          newEntry.appendChild(deleteButton);

          // the items displayed from the read's completed execution
          // displays a new 'ul' for each item and appended on that
          //  is it's associated delete button functionality
          deleteButton.addEventListener('click', () => {
            const display = document.getElementById('display');
            display.remove();
            const newDisplay = document.createElement('ul');
            newDisplay.id = 'display';
            document.getElementById('container').appendChild(newDisplay);
            const url = new URL('http://localhost:8080/books/deletebook:id?');
            // const url = new URL('http://localhost:3000/books/deletebook:id?');
            url.searchParams.append('id', bookInDb._id);

            fetch(url, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
            })
              .then(res => res.json())
              .then(data => {
                const newEntry = document.createElement('li');
                newEntry.innerHTML = `DELETED: ${data.title}`;
                document.getElementById('display').appendChild(newEntry);
              })
              .catch(err => {
                console.log(err);
              });
          });
        }
      });
  });

  // get books info
  document.getElementById('booksInfo').addEventListener('click', () => {
    const display = document.getElementById('display');
    display.remove();

    const newDisplay = document.createElement('ul');
    newDisplay.id = 'display';
    newDisplay.innerHTML = 'List of books';
    document.getElementById('container').appendChild(newDisplay);

    fetch('http://localhost:8080/customers/getbooksinfo', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i += 1) {
          const newEntry = document.createElement('li');
          const bookInDb = data[i];

          newEntry.innerHTML = `TITLE: ${bookInDb.title}`;
          document.getElementById('display').appendChild(newEntry);
        }
      });
  });

  

  
  // get customers info

};
