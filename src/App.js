import React from 'react';
import styles from './App.module.css'; // import styles для CSS Modules
import PurchasesList from './components/PurchasesList/PurchasesList';
import PurchaseProvider from './components/PurchaseProvider/PurchaseProvider';

// styles.App -> .App - имя класса
function App() {
  return (
    <div className={styles.App}>
      <PurchaseProvider>
        <PurchasesList/>
      </PurchaseProvider>
    </div>
  );
}

export default App;
