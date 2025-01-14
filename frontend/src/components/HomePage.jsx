import React from 'react'
import Header_img from '../assets/Header.jpg';
import Dosa_img from '../assets/Dosa.jpg';


const HomePage = () => {
  return (
    <div className="bg-primary px-6 py-16 md:py-24 flex flex-col gap-12">

      {/* --------- Main Heading and Description --------- */}
      <div className="bg-gray-100 rounded-lg shadow-md p-8 md:p-10 flex flex-col space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          The BIT Campus is completely residential with 11 hostels for boys and 3 hostels for girls. <br />
          Spacious and beautiful, the lodgings are laid out amidst lush greenery.
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          The hostels are a hub of student activities. Students are encouraged to pursue a wide range of extra-curricular activities and hobbies in their free time.
        </p>
      </div>

      {/* --------- Hostel Info Section --------- */}
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Info Card */}
        <div className="bg-gray-100 rounded-lg shadow-md p-8 md:p-10 flex-1">
          <p className="text-lg font-medium text-gray-800">
            Male students are provided with well-furnished, single accommodation, while the ladies share their accommodation in spacious, furnished rooms. Wide verandas encourage impromptu discussions and act as “thinking spaces,” while the natural surroundings instill a sense of peace and quiet.
          </p>
          <div className="mt-6 text-sm md:text-base text-gray-600">
            <b>The Common Hostel facilities include:</b>
            <ul className="list-disc list-inside mt-2">
              <li>Dining halls</li>
              <li>Common rooms with indoor games</li>
              <li>Reading rooms with magazines, periodicals, and newspapers</li>
              <li>Entertainment halls with televisions</li>
              <li>Independent mess halls managed by students</li>
              <li>Inter-hostel tournaments, quizzes, competitions, and trips</li>
            </ul>
          </div>
        </div>

        {/* Right Image Card */}
        <div className="bg-gray-100 rounded-lg shadow-md p-6 md:p-8 flex-1 flex flex-col items-center space-y-6">
          <img
            className="w-full h-64 md:h-80 object-cover rounded-md shadow-md"
            src={Header_img}
            alt="Hostel"
          />
          <p className="text-sm md:text-base text-gray-600 text-center">
            The ‘Hostel Night’ organized by resident students is a memorable yearly event where students interact with the faculty amidst cultural programs and festivities.
          </p>
        </div>

      </div>

      <div className="bg-gray-100 rounded-lg shadow-md p-8 md:p-10 flex flex-col space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Message from the Dean, Student Affairs
        </h1>
        <img
         className='w-40 h-20 md:h-60 object-cover rounded-md shadow-md' 
         src={Dosa_img} 
         alt=""
        />
        <p className="text-sm md:text-base text-gray-600">
            Since its inception in 1955, Birla Institute of Technology, Mesra, Ranchi has been imparting quality education to the students of various discipline such as Engineering, Pharmaceutical Sciences, Management etc. It is mandatory for all the students to stay in the Hostel during their course of study. The Institute has 14 hostels which includes 12 hostels for boys and 2 for girls.
        </p>
        <p className="text-sm md:text-base text-gray-600">
            The hostels have their own mess which is run by the student's body. All the hostels have their own TV hall, reading rooms, indoors sports hall, guest hall and common rooms. The students are provided with the internet facilities in their rooms. All the hostel have the outdoor sports facilities consisting of Volley ball and Badminton courts. Currently two of the hostels are having complete wi-fi facility.
        </p>
        <p className="text-sm md:text-base text-gray-600">
            The process is going on to make all the hostels covered with the Wi-Fi network. All the hostels have their individual team of Warden and Assistant Wardens who are available 24 x 7 to help the students in case of any emergency.
        </p>
        <p className='text-sm md:text-base text-gray-600'>
        The Institute also has around 34 clubs/ societies for the development of students in the area of cultural and technical activities. All the clubs/ societies have their own students body and is guided by one Faculty advisor. Every year the Institute organizes an Athletic meet, Technical event PANTHEON and Cultural event BITOTSAV. It is expected that the students joining our esteemed Institute will definitely have a very comfortable stay.
        </p>
        <hr />
        
        <h3 className='text-2xl lg:text-2xl font-bold text-gray-800'>
            Contact
        </h3>
        <hr />
        <p>Dean (Student Affairs)</p>
        <p>Dr. Bhaskar Karn</p>
        PH - 2276070 <br />
        Ext - 4419 <br />
        Email : dosa@bitmesra.ac.in
      </div>
    </div>
  )
}

export default HomePage
