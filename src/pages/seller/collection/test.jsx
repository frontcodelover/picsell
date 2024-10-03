import React from 'react';

const ArtistPage = () => {
  const artist = {
    name: "Luc Dratwa",
    bio: `De par leur approche graphique, les créations visuelles de Luc Dratwa font preuve d’une rare expressivité, chargée d’émotion. Windows, sa série, montre le célèbre Empire State Building dans son élément : New York la trépidante.`,
    artworks: [
      {
        title: "Windows III",
        imageUrl: "/path-to-image/windows3.jpg",
        size: "120 x 93 cm",
        price: "€599",
      },
      {
        title: "Taking-Off, 17:21",
        imageUrl: "/path-to-image/taking-off.jpg",
        size: "121 x 94 cm",
        price: "€649",
      },
      // Ajoute d'autres œuvres d'art ici
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Section d'introduction */}
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{artist.name}</h1>
        <p className="text-gray-600">{artist.bio}</p>
      </section>

      {/* Section des œuvres */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Œuvres disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artist.artworks.map((artwork, index) => (
            <div key={index} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-medium text-gray-900 mb-2">{artwork.title}</h3>
              <p className="text-gray-500">Dimensions : {artwork.size}</p>
              <p className="text-gray-500 mb-4">Prix : {artwork.price}</p>
              <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section de soutien aux artistes */}
      <section className="bg-gray-100 p-6 rounded-md text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Soutient les artistes</h3>
        <p className="text-gray-600">
          Avec chaque achat chez LUMAS, l'artiste reçoit une commission équitable.
        </p>
      </section>
    </div>
  );
};

export default ArtistPage;
