import React from 'react'

export default function Started() {
    return (
      <section className="relative flex flex-col items-center justify-center py-12 px-6">
        {/* Handwritten circles */}
        <svg
          className="absolute top-10 left-16 w-20 h-20 text-primary/50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
  
        <svg
          className="absolute top-48 right-20 w-16 h-16 text-primary/50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" />
        </svg>
  
        <svg
          className="absolute bottom-12 left-10 w-24 h-24 text-primary/50"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" />
        </svg>
  
        <div className="max-w-5xl text-center relative">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-500 mb-4">
            Ready To Elevate Your Restaurant Management?
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 justify-center text-center">
            Seamlessly manage reservations with an intuitive system, 
            <br /> ensuring a smooth booking process for both <br /> staff and customers.
          </p>
          <button className="bg-primary text-white py-3 px-6 rounded-full hover:bg-primary/50">
            Get Started
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 relative">
          {/* Reservation card */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-lg text-gray-700">Current Reservations</h3>
            <ul className="mt-4">
              {['Michelle Rivera', 'Arlene McCoy', 'Savannah Nguyen'].map((name, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-800">{name}</span>
                  <span className="text-gray-500">Confirmed</span>
                </li>
              ))}
            </ul>
          </div> */}
  
          {/* Waiters card */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-lg text-gray-700">Waiters On The First Floor</h3>
            <ul className="mt-4">
              {['Kristin Watson', 'Jacob Jones', 'Ronald Richards'].map((waiter, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-800">{waiter}</span>
                  <span className="text-gray-500">Available</span>
                </li>
              ))}
            </ul>
          </div> */}
  
          {/* Add position card */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="font-semibold text-lg text-gray-700">Add Position To Order</h3>
            <ul className="mt-4 space-y-2">
              {[
                { item: 'Steak', price: '$19.99' },
                { item: 'Spaghetti', price: '$12.99' },
                { item: 'Chocolate Cake', price: '$8.99' },
              ].map((order, index) => (
                <li key={index} className="flex justify-between items-center py-2">
                  <span className="text-gray-800">{order.item}</span>
                  <span className="text-gray-500">{order.price}</span>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        
      </section>
    );
  }
  
