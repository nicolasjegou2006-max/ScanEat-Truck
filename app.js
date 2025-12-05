const { useState, useEffect } = React;

const ScanEatApp = () => {
  const [currentPage, setCurrentPage] = useState('menu');
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const menuItems = {
    pates: [
      { id: 1, name: 'Carbonara', description: 'Lardons, crème, parmesan, œuf', price: 9.50, image: '🍝' },
      { id: 2, name: 'Bolognaise', description: 'Sauce tomate, viande hachée, parmesan', price: 9.50, image: '🍝' },
      { id: 3, name: 'Pesto', description: 'Basilic, pignons, parmesan, huile d\'olive', price: 9.50, image: '🍝' },
      { id: 4, name: 'Arrabiata', description: 'Sauce tomate épicée, ail, piment', price: 9.00, image: '🍝' }
    ],
    pokebowls: [
      { id: 5, name: 'Saumon', description: 'Riz, saumon, avocat, edamame, sésame', price: 11.50, image: '🥗' },
      { id: 6, name: 'Thon', description: 'Riz, thon, mangue, concombre, sauce soja', price: 11.50, image: '🥗' },
      { id: 7, name: 'Poulet Teriyaki', description: 'Riz, poulet, carottes, chou rouge', price: 10.50, image: '🥗' },
      { id: 8, name: 'Végétarien', description: 'Riz, tofu, légumes croquants, gingembre', price: 10.00, image: '🥗' }
    ],
    salades: [
      { id: 9, name: 'César', description: 'Poulet, parmesan, croûtons, sauce césar', price: 9.50, image: '🥗' },
      { id: 10, name: 'Chèvre Chaud', description: 'Chèvre, miel, noix, mesclun', price: 9.50, image: '🥗' },
      { id: 11, name: 'Méditerranéenne', description: 'Feta, tomates, olives, concombre', price: 9.00, image: '🥗' },
      { id: 12, name: 'Composée', description: 'Jambon, œuf, tomates, maïs', price: 8.50, image: '🥗' }
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const placeOrder = () => {
    if (customerName.trim() && cart.length > 0) {
      setCurrentPage('time');
    }
  };

  const confirmOrder = () => {
    if (selectedTime) {
      const orderNum = Math.floor(Math.random() * 900) + 100;
      setOrderNumber(orderNum);
      setOrderPlaced(true);
      setCurrentPage('confirmation');
    }
  };

  const resetOrder = () => {
    setCart([]);
    setOrderPlaced(false);
    setOrderNumber(null);
    setCustomerName('');
    setSelectedTime('');
    setCurrentPage('menu');
  };

  // Simple SVG Icons (sans dépendance)
  const PlusIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: '12', y1: '5', x2: '12', y2: '19' }),
      React.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
    )
  );

  const MinusIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' })
    )
  );

  const XIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '20', height: '20', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
      React.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
    )
  );

  const CartIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('circle', { cx: '9', cy: '21', r: '1' }),
      React.createElement('circle', { cx: '20', cy: '21', r: '1' }),
      React.createElement('path', { d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' })
    )
  );

  const CheckIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '3', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('polyline', { points: '20 6 9 17 4 12' })
    )
  );

  const ClockIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('circle', { cx: '12', cy: '12', r: '10' }),
      React.createElement('polyline', { points: '12 6 12 12 16 14' })
    )
  );

  const ArrowLeftIcon = () => (
    React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: '24', height: '24', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round' },
      React.createElement('line', { x1: '19', y1: '12', x2: '5', y2: '12' }),
      React.createElement('polyline', { points: '12 19 5 12 12 5' })
    )
  );

  // Générer les créneaux horaires (ex: de 11h30 à 14h30 par tranches de 15min)
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 11;
    const startMinute = 30;
    const endHour = 14;
    const endMinute = 30;
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        if (hour === startHour && minute < startMinute) continue;
        if (hour === endHour && minute > endMinute) break;
        
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeStr);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Page Menu
  const MenuPage = () => (
    React.createElement('div', { className: 'min-h-screen', style: { backgroundColor: '#F6E5CD' } },
      React.createElement('div', { className: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 shadow-lg sticky top-0 z-10' },
        React.createElement('div', { className: 'flex items-center justify-center mb-2' },
          React.createElement('span', { className: 'text-4xl mr-2' }, '👨‍🍳'),
          React.createElement('h1', { className: 'text-3xl font-bold' }, 'ScanEat Truck')
        ),
        React.createElement('p', { className: 'text-center text-orange-100 text-sm' }, 'Commandez et récupérez sur place')
      ),
      React.createElement('div', { className: 'p-4' },
        Object.entries(menuItems).map(([category, items]) =>
          React.createElement('div', { key: category, className: 'mb-8' },
            React.createElement('h2', { className: 'text-2xl font-bold text-gray-800 mb-4 capitalize flex items-center' },
              category === 'pates' && '🍝',
              category === 'pokebowls' && '🥙',
              category === 'salades' && '🥗',
              React.createElement('span', { className: 'ml-2' }, category)
            ),
            React.createElement('div', { className: 'space-y-3' },
              items.map(item =>
                React.createElement('div', { key: item.id, className: 'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow' },
                  React.createElement('div', { className: 'flex justify-between items-start' },
                    React.createElement('div', { className: 'flex-1' },
                      React.createElement('div', { className: 'flex items-center mb-1' },
                        React.createElement('span', { className: 'text-2xl mr-2' }, item.image),
                        React.createElement('h3', { className: 'font-bold text-lg text-gray-800' }, item.name)
                      ),
                      React.createElement('p', { className: 'text-gray-600 text-sm mb-2' }, item.description),
                      React.createElement('p', { className: 'text-orange-600 font-bold text-lg' }, item.price.toFixed(2) + ' €')
                    ),
                    React.createElement('button', {
                      onClick: () => addToCart(item),
                      className: 'bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 transition-colors ml-3'
                    }, PlusIcon())
                  )
                )
              )
            )
          )
        )
      ),
      cart.length > 0 && React.createElement('div', { className: 'fixed bottom-0 left-0 right-0 p-4 bg-white shadow-2xl border-t-2 border-orange-200' },
        React.createElement('button', {
          onClick: () => setCurrentPage('cart'),
          className: 'w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-between hover:from-orange-600 hover:to-amber-600 transition-all'
        },
          React.createElement('div', { className: 'flex items-center' },
            CartIcon(),
            React.createElement('span', { className: 'ml-2' }, `Voir le panier (${getTotalItems()})`)
          ),
          React.createElement('span', null, getTotalPrice() + ' €')
        )
      )
    )
  );

  // Page Panier
  const CartPage = () => (
    React.createElement('div', { className: 'min-h-screen', style: { backgroundColor: '#F6E5CD' } },
      React.createElement('div', { className: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 shadow-lg' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('h1', { className: 'text-2xl font-bold' }, 'Votre Panier'),
          React.createElement('button', {
            onClick: () => setCurrentPage('menu'),
            className: 'text-white hover:bg-orange-600 p-2 rounded-full transition-colors'
          }, XIcon())
        )
      ),
      React.createElement('div', { className: 'p-4' },
        cart.length === 0 ? (
          React.createElement('div', { className: 'text-center py-12' },
            React.createElement('div', { className: 'text-gray-400 mb-4' }, CartIcon()),
            React.createElement('p', { className: 'text-gray-600 text-lg' }, 'Votre panier est vide'),
            React.createElement('button', {
              onClick: () => setCurrentPage('menu'),
              className: 'mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600'
            }, 'Voir le menu')
          )
        ) : (
          React.createElement(React.Fragment, null,
            React.createElement('div', { className: 'space-y-3 mb-24' },
              cart.map(item =>
                React.createElement('div', { key: item.id, className: 'bg-white rounded-xl shadow-md p-4' },
                  React.createElement('div', { className: 'flex justify-between items-start mb-3' },
                    React.createElement('div', null,
                      React.createElement('h3', { className: 'font-bold text-lg' }, item.name),
                      React.createElement('p', { className: 'text-orange-600 font-semibold' }, item.price.toFixed(2) + ' €')
                    ),
                    React.createElement('button', {
                      onClick: () => removeFromCart(item.id),
                      className: 'text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors'
                    }, XIcon())
                  ),
                  React.createElement('div', { className: 'flex items-center justify-between' },
                    React.createElement('div', { className: 'flex items-center space-x-3 bg-gray-100 rounded-lg p-1' },
                      React.createElement('button', {
                        onClick: () => updateQuantity(item.id, -1),
                        className: 'bg-white text-orange-500 rounded-lg p-2 hover:bg-orange-50 transition-colors'
                      }, MinusIcon()),
                      React.createElement('span', { className: 'font-bold text-lg px-3' }, item.quantity),
                      React.createElement('button', {
                        onClick: () => updateQuantity(item.id, 1),
                        className: 'bg-white text-orange-500 rounded-lg p-2 hover:bg-orange-50 transition-colors'
                      }, PlusIcon())
                    ),
                    React.createElement('span', { className: 'font-bold text-lg' }, (item.price * item.quantity).toFixed(2) + ' €')
                  )
                )
              )
            ),
            React.createElement('div', { className: 'fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl border-t-2 border-orange-200' },
              React.createElement('div', { className: 'mb-3' },
                React.createElement('input', {
                  type: 'text',
                  placeholder: 'Votre prénom',
                  value: customerName,
                  onChange: (e) => setCustomerName(e.target.value),
                  className: 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg'
                })
              ),
              React.createElement('div', { className: 'flex justify-between items-center mb-3' },
                React.createElement('span', { className: 'text-xl font-bold text-gray-800' }, 'Total'),
                React.createElement('span', { className: 'text-2xl font-bold text-orange-600' }, getTotalPrice() + ' €')
              ),
              React.createElement('button', {
                onClick: placeOrder,
                disabled: !customerName.trim(),
                className: 'w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              },
                CheckIcon(),
                React.createElement('span', { className: 'ml-2' }, 'Valider la commande')
              )
            )
          )
        )
      )
    )
  );

  // Page Sélection d'horaire
  const TimePage = () => (
    React.createElement('div', { className: 'min-h-screen', style: { backgroundColor: '#F6E5CD' } },
      React.createElement('div', { className: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 shadow-lg' },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('button', {
            onClick: () => setCurrentPage('cart'),
            className: 'text-white hover:bg-orange-600 p-2 rounded-full transition-colors'
          }, ArrowLeftIcon()),
          React.createElement('h1', { className: 'text-2xl font-bold' }, 'Heure de retrait'),
          React.createElement('div', { style: { width: '40px' } })
        )
      ),
      React.createElement('div', { className: 'p-4' },
        React.createElement('div', { className: 'bg-white rounded-xl shadow-md p-6 mb-6' },
          React.createElement('div', { className: 'flex items-center mb-4' },
            React.createElement('div', { className: 'text-orange-500 mr-3' }, ClockIcon()),
            React.createElement('div', null,
              React.createElement('h2', { className: 'text-xl font-bold text-gray-800' }, 'Choisissez votre créneau'),
              React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Sélectionnez l\'heure à laquelle vous souhaitez récupérer votre commande')
            )
          )
        ),
        React.createElement('div', { className: 'grid grid-cols-3 gap-3 mb-24' },
          timeSlots.map(time =>
            React.createElement('button', {
              key: time,
              onClick: () => setSelectedTime(time),
              className: `p-4 rounded-xl font-semibold text-lg transition-all ${
                selectedTime === time
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-800 hover:bg-orange-50 shadow-md'
              }`
            }, time)
          )
        ),
        React.createElement('div', { className: 'fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl border-t-2 border-orange-200' },
          React.createElement('button', {
            onClick: confirmOrder,
            disabled: !selectedTime,
            className: 'w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          },
            CheckIcon(),
            React.createElement('span', { className: 'ml-2' }, 'Confirmer la commande')
          )
        )
      )
    )
  );

  // Page Confirmation
  const ConfirmationPage = () => (
    React.createElement('div', { className: 'min-h-screen flex items-center justify-center p-4', style: { backgroundColor: '#F6E5CD' } },
      React.createElement('div', { className: 'bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center' },
        React.createElement('div', { className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6' },
          CheckIcon()
        ),
        React.createElement('h1', { className: 'text-3xl font-bold text-gray-800 mb-2' }, 'Commande validée !'),
        React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Merci ' + customerName),
        React.createElement('div', { className: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 mb-6' },
          React.createElement('p', { className: 'text-sm mb-2' }, 'Votre numéro de commande'),
          React.createElement('p', { className: 'text-6xl font-bold mb-3' }, '#' + orderNumber),
          React.createElement('div', { className: 'bg-white bg-opacity-20 rounded-lg p-3 mt-4' },
            React.createElement('p', { className: 'text-sm mb-1' }, 'Heure de retrait'),
            React.createElement('p', { className: 'text-2xl font-bold' }, selectedTime)
          )
        ),
        React.createElement('div', { className: 'bg-amber-50 rounded-xl p-4 mb-6 flex items-start' },
          React.createElement('div', { className: 'text-amber-600 mr-3 flex-shrink-0 mt-1' }, ClockIcon()),
          React.createElement('div', { className: 'text-left' },
            React.createElement('p', { className: 'font-semibold text-gray-800 mb-1' }, 'Temps de préparation'),
            React.createElement('p', { className: 'text-gray-600 text-sm' }, 'Environ 10-15 minutes'),
            React.createElement('p', { className: 'text-gray-600 text-sm mt-2' }, `Votre commande sera prête pour ${selectedTime}. Nous vous appellerons si besoin !`)
          )
        ),
        React.createElement('button', {
          onClick: resetOrder,
          className: 'w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors'
        }, 'Nouvelle commande')
      )
    )
  );

  return React.createElement('div', { className: 'max-w-md mx-auto' },
    currentPage === 'menu' && MenuPage(),
    currentPage === 'cart' && CartPage(),
    currentPage === 'time' && TimePage(),
    currentPage === 'confirmation' && ConfirmationPage()
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ScanEatApp));