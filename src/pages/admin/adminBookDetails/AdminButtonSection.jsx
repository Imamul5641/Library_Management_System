import { React, useState, useRef } from 'react'

import ModeIcon from '@mui/icons-material/Mode';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { Button as EditButton } from 'react-bootstrap'
import { Modal as EditModal } from 'react-bootstrap'

import './AdminBookDetailsDesign.css'

import { toast } from 'react-toastify';

//Expect the book object as props.
export default function AdminButtonSection(props) {
  const apiURL = import.meta.env.VITE_APP_API_URL;

  //TODO props.book
  // const book = { shelving_no: "sh-2-4", isbn: '978-0-19-852663-6', cover_img: "https://www.pngkey.com/png/detail/350-3500680_placeholder-open-book-silhouette-vector.png", author: "abcd", title: "Learn C++ online", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", date_of_publication: "2023", publisher: "Mc Graw Hill", no_of_copies: 10, edition: 6 };//TODO props.book
  const book = props.book;

  //use state for the plus and minus buttons
  const [isClickEnabled, setIsClickEnabled] = useState(false);
  const [bgclass, setBgclass] = useState('bg-grey')


  const [author, setAuthor] = useState(book.author);
  const [book_title, setBookTitle] = useState(book.title);
  const [date_publication, setDateOfPublication] = useState(book.date_of_publication);
  const [publisher, setPublisher] = useState(book.publisher);
  const [book_description, setBookDescription] = useState(book.description);
  const [isbn, setIsbn] = useState(book.isbn);
  const [shelVingNo, setShelVingNo] = useState(book.shelving_no);
  const [noOfCopies, setNoOfCopies] = useState(book.no_of_copies);
  const [edition, setEdition] = useState(book.edition);
  const [cover_image, setCoverImage] = useState(book.cover_img);

  const [details, setDetails] = useState(book_description.substring(0, 150));

  const handleShelvingNoChange = (e) => {
    setShelVingNo(e.target.value);
  }
  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }
  const handlePublisherChange = (e) => {
    setPublisher(e.target.value);
  }
  const handleIsbnChange = (e) => {
    setIsbn(e.target.value);
  }
  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
    setDetails(e.taret.value)
  }
  const handleDateOfPublicationChange = (e) => {
    setDateOfPublication(e.target.value);
  }
  const handleEditionChange = (e) => {
    setEdition(e.target.value);
  }

  //Edit book details modal
  const [show, setShow] = useState(false);

  const handleCloseEdit = () => setShow(false);
  const handleShow = () => setShow(true);
  const editButtonRef = useRef();


  const plusRef = useRef();
  const minusRef = useRef();

  const handleEditBook = () => {
    editButtonRef.current.click();
    console.log("called handle edit book");
  }
  const handleSaveEditDetails = async () => {
    setShow(false);
    const data = {
      "shelving_no": shelVingNo,
      "isbn": isbn,
      "date_of_publication": date_publication,
      "edition": edition,
      "description": book_description,
      "title": book_title,
      "cover_img": cover_image,
      "author_name": author,
      "sub_name": book_title
    }

    try {
      toast.info("Request sent to the server.")
      const response = await fetch(`${apiURL}/api/admin/book/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if(response.status === 200){
        toast.success("Book details updated successfully.")
        //TODO dispatch(action)
      }
      else{
        toast.error("Error! updating book details.");
      }
      const json = await response.text()
      console.log(`Response for edit book details, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      console.log('Error while requesing for edit book details: ', error)
      toast.error("Error! updating book details.");
    }
  }

  const handleEditAvailability = () => {
    setIsClickEnabled(true);
    setBgclass('bg-red')
  }
  const handleSaveAvailability = async () => {
    setIsClickEnabled(false);
    setBgclass('bg-grey');
    const data = {
      "isbn": isbn,
      "updatedCount": noOfCopies
    };
    toast.info("Request sent to the server.");
    try {
      const response = await fetch(`${apiURL}/api/admin/book/update-availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      if (response.status === 200) {
        toast.success("Book availability updated successfully.")

        //TODO dispatch(action)
      }
      else{
        toast.error("Error! updating book availability.")
      }
      const json = await response.text();
      console.log(`Response for update book availability, isbn - ${isbn} :  ${json}`);
    } catch (error) {
      toast.error("Error! updating book availability.");
      console.log('Error while requesing for update book availability: ', error)
    }
  }

  const handleIncrement = () => {
    setNoOfCopies(noOfCopies + 1);
  }

  const handleDecrement = () => {
    setNoOfCopies(noOfCopies - 1);
  }

  return (
    <>
      <div>
        <EditButton ref={editButtonRef} variant="primary" onClick={handleShow} className='hidden'>
          Launch demo modal
        </EditButton>

        <EditModal show={show} onHide={handleCloseEdit}>
          <EditModal.Header closeButton>
            <EditModal.Title>Enter new details</EditModal.Title>
          </EditModal.Header>
          <EditModal.Body className='edit_modal_body'>
            <div className="take_input flex flex-row">
              <label htmlFor="shelving_no" className=' text-lg mr-2'>Shelving No:</label>
              <input id='shelving_no' type="text" className='input_field ' value={shelVingNo} onChange={handleShelvingNoChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="title" className=' text-lg mr-2'>Title:</label>
              <input id='title' type="text" className='input_field ' value={book_title} onChange={handleTitleChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="author" className=' text-lg mr-2'>Author:</label>
              <input id='author' type="text" className='input_field' value={author} onChange={handleAuthorChange} />
            </div>
            <div className="take_input flex flex-row">
              <label htmlFor="publisher" className=' text-lg mr-2' >Publisher:</label>
              <input id='publisher' type="text" className='input_field' value={publisher} onChange={handlePublisherChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="date" className=' text-lg mr-2'>Date of publication:</label>
              <input id='date' type="text" className='input_field' value={date_publication} onChange={handleDateOfPublicationChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="edition" className=' text-lg mr-2'>Edition:</label>
              <input id='edition' type="text" className='input_field' value={edition} onChange={handleEditionChange} />
            </div>

            <div className="take_input flex flex-row">
              <label htmlFor="isbn" className=' text-lg mr-2'>ISBN:</label>
              <input id='isbn' type="text" className='input_field' value={isbn} onChange={handleIsbnChange} />
            </div>
            <div
              className="take_input flex flex-row">
              <label htmlFor="description" className=' text-lg mr-2'>Description:</label>
              <textarea name="description" id="description" className='input_field w-3/4 h-28' value={book_description} onChange={handleDescriptionChange}></textarea>
            </div>
          </EditModal.Body>
          <EditModal.Footer>
            <EditButton variant="secondary" onClick={handleCloseEdit}>
              Cancel
            </EditButton>
            <EditButton variant="primary" onClick={handleSaveEditDetails}>
              Save Changes
            </EditButton>
          </EditModal.Footer>
        </EditModal>


      </div>
      <div className="buttons_section">
        <div className="flex flex-row  items-center">
          <span className='mr-2 text-red-900 font-bold text-lg'>Availability: </span>
          <div className=' w-24 h-8 flex flex-row justify-between items-center'>
            <span ref={minusRef} onClick={isClickEnabled === true ? handleDecrement : null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${bgclass}`}>-</span>
            <span className='flex justify-center items-center text-lg font-bold bg-red-200 w-8 h-8'>{noOfCopies}</span>
            <span ref={plusRef} onClick={isClickEnabled === true ? handleIncrement : null} className={`flex justify-center items-center text-lg font-bold  w-8 h-8 ${bgclass}`}>+</span>
          </div>
          {
            isClickEnabled === false ? <DriveFileRenameOutlineIcon onClick={handleEditAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100' /> : <DoneAllIcon onClick={handleSaveAvailability} className=' text-red-900 text-2xl cursor-pointer border-2 border-red-800 ml-2 rounded-sm hover:bg-red-100' />
          }
        </div>
        <button onClick={handleEditBook} className='edit_button bg-red-900 hover:bg-red-800 text-white font-bold p-2 rounded-full mt-3'> Edit book details <ModeIcon className='pen_icon' /></button>

      </div>
    </>
  )
}
