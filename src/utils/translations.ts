export const resources = {
  en: {
    translation: {
      general: {
        logoutButton: "Logout",
        errorPleaseReloadMessage: "Error! Reload the page",
        errorOfflineMessage: "You are not online, check your connection!",
        loadingMessage: "Loading",
        reload: "Reload",
      },
      validation: {
        notValidEmail: "Email not valid",
        atLeast6chars: "The password must contain at least 6 characters",
        atLeast1Number: "The password must contain at least one number",
        atLeastUpperAndLowerCase: "The password must contain at least one uppercase and one lowercase letter",
        atLeastSpecialChar: "The password must contain at least one special character",
        notPasswordConfirm: "The two inserted password does not match"
      },
      registration: {
        loginButton: "Login",
        registration: "REGISTRATION",
        email: "Email",
        insertEmailPlaceholder: "Insert email",
        password: "Password",
        confirmPassword: "Confirm password",
        insertPasswordPlaceholder: "Insert password",
        confirmPasswordPlaceholder: "Insert password again",
        confirm: "Register",
        errorRegistration: "Error during registration",
      },
      login: {
        signinButton: "Registration",
        login: "LOGIN",
        email: "Email",
        insertEmailPlaceholder: "Insert email",
        password: "Password",
        insertPasswordPlaceholder: "Insert password",
        recoverPassword: "Recover Password",
        confirm: "Login",
        errorLogin: "Error during the login phase",
      },
      recoverPassword: {
        goRegistrationPageButton: "Back to login page",
        recoverPassword: "RECOVER PASSWORD",
        email: "Email",
        insertEmailPlaceholder: "Insert email",
        sendRecoverEmail: "Send Recovery Mail",
        mailHasBeenSent: "A mail has been sent to {{email}} for the password recovery",
        errorSendingEmail: "Error while recovering the password",
      },
      waitingRegistration: {
        confirmEmail: "CONFIRM EMAIL",
        emailSentToConfirm: "We have sent you a confirmation email to your email address",
      },
      registrationConfirming: {
        confirmSuccess: "Email successfully verified",
        confirmError: "Error verifying email",
      },
      changePassword: {
        goLoginPageButton: "Back to login page",
        changePassword: "PASSWORD CHANGE",
        newPassword: "New password",
        insertNewPassword: "Insert new password",
        confirmPassword: "Confirm new password",
        passwordCorreclyChanged: "The password was changed successfully",
        errorChangingPassword: "Error saving new password",
      },
      home: {
        updatePricesButton: "Update prices",
        editButton: "Edit",
        saveButton: "Confirm",
        cancelButton: "Cancel",
        coinsWithNoExistingTypologyChanges: "Coins assigned to types that have been removed now have an empty type",
        pricesUpdateCompleted: "Prices have been updated",
        pricesAlreadyUpdated: "Prices are already updated",
        prefCurrencyUpdateCompleted: "Currency has been changed to ",
        prefCurrencyShouldChangeVesting: "Warning! You need to manually change the total invested in ",
        prefCurrencyUpdateError: "Changes related to currency not saved",
        prefCurrencyFetchError: "Error loading currency",
        helloMessage: "Hello",
        vesting: {
          title: "Investment summary:",
          totalInvested: "Total invested",
          yourCoinsValue: "Your coins value",
          profitOrLoss: "Profit / Loss",
          vestingCantBeZero: "You cannot enter 0 or less as invested value",
          editingCanceled: "You have canceled the changes to the invested value",
          updateCompleted: "Changes related to total invested successfully saved",
          updateError: "Changes related to total invested not saved",
          fetchError: "Error loading total invested",
        },
        wallet: {
          title: "Wallet allocation:",
          percentageSumNotCorrect: "The sum of the percentages in your wallet is {{amount}}, it must be 100",
          typology: "Typology",
          percentage: "Percentage",
          pieceTotal: "Corresponding",
          insertAtLeastOneTypology: "Insert at least one typology",
          editingCanceled: "You have canceled the changes related to the wallet allocation",
          cantInsertNegativeValue: "You cannot enter a negative percentage allocation number",
          updateCompleted: "Wallet allocation changes successfully saved",
          updateError: "Wallet allocation changes not saved",
          fetchError: "Error loading wallet",
        },
        addCoin: {
          title: "Add your coins:",
          dropdownPlaceholder: "Write or choose here one coin",
          dropdownDisabledPlaceholder: "Complete editing of section below",
        },
        coins: {
          title: "Asset allocation and rebalancing:",
          allocationCantBeNegative: "You cannot enter a negative allocation percentage",
          percentageSumNotCorrect: "You have not allocated the right percentage to each  group:",
          allocationCorrect: "Correct",
          allocationWrong: "Wrong",
          typologyCellTitle: "Typology",
          logoCellTitle: "Logo",
          symbolAndNameCellTitle: "Symbol and name",
          allocationCellTitle: "Allocation",
          allocationCountervalueCellTitle: "Allocation countervalue",
          priceCellTitle: "Price",
          change24CellTitle: "24h change",
          coinsCellTitle: "Coins",
          holdingCellTitle: "Currency holding",
          percentageBalanceCellTitle: "Percentage balance",
          valueImbalanceCellTitle: "Value imbalance",
          rebalancingCoinsCellTitle: "Rebalancing coin number",
          cantInsertNegativeAllocationValue: "You cannot enter a negative percentage allocation number",
          cantInsertNegativeCoinsValue: "You cannot enter a negative coin value number",
          editingCanceled: "You have canceled the changes of the coins",
          noCoinsMessage: "Insert at least one coin",
          updateCompleted: "Changes related to coins saved successfully",
          updateError: "Changes related to coins not saved",
          fetchError: "Error loading coins",
          typologyDropdownPlaceholder: "Typology",
          insertAtLeastOneCoin: "Insert at least one coin",
        },
      },
      info: {
        title1: "Welcome!",
        aboutProject:
          "This page will help you to understand our project.\n\n\nWe are two engineers and crypto enthusiastic.\n\n\nWe aim to support people interested in crypto through a collection of tools.\nThe first one is already available on this platform: ",
        ourVisionBold: "a tool that will help you in crypto portfolio rebalancing.",
        aboutRebalancing: "\n\nIf you are interested in portfolio rebalancing, you can read something interesting",
        hereRef: "here",
        linkDescription: "(an italian rebalancing article written by The Crypto Gatway).",
        toolDescription: "Our tool will give you the following functionality:",
        functionality1: "- track the amount of invested capital and calculate the gain/loss of your wallet in real-time",
        functionality2: "- create your portfolio by allocating your capital with the percentage you consider most appropriate",
        functionality3: "- track your cryptocurrency manually: the number of coins, what are their typologies, and the percentage reserved for such coins",
        applicationInfo: "Before starting the tutorial we will inform you about some application info:",
        info1: "- the application does not interact with any exchange/wallet, so the coins must be added, edited, or removed manually",
        info2: "- the service offered is free and in continuous development",
        info3: "- users' data are collected in a well-protected database",
        info4: "- coins' data (price, variation, ecc) follow the Coingecko values",
        info5: "- since the platform is in a beta testing phase, bugs or malfunctions may occur",
        helpFeedback: "Feel free to contact us for a feedback or a bug report at",
        helpMail: "infowebfinance@gmail.com",
        title2: "Let's start!",
        introTutorial:
          'The first and most important step consists of having in mind how to structure your portfolio.\n\nAs you know, it is important to divide your portfolio by risk typologies and allocate a percentage to each of them.\n\nEvery investor has his strategy! You have to find yours in order to do the correct move, and not act moved by feelings.\n\nIf you are interested in reading something more about "how to structure your portfolio" we suggest you take a look',
        linkDescription2: "(written by The Crypto Gateway).",
        registrationLink: "To register on the application click ",
        registrationPhase:
          "\n\nYou will receive an email with some instructions, follow them, and finally you can start to set up your wallet tracker.\n\nOnce your account is ready, you will land on this page:",
        panel1:
          "The panel at the top left, allows you to insert the total amount of fiat you have invested in cryptocurrency. This value can be edited whenever you want, e.g. when you buy or withdraw cryptocurrency.",
        panel2:
          "Now it is time to set up the portfolio risk typologies. As shown in the following screenshot, you can add new typologies (with the green plus button), remove them (with the red trash button), and also edit their names and allocation percentage.",
        panel3:
          "Under the first two panels, there is a search bar that will help you add your owned coin. It is possible to add the same coin more than one time. This feature helps those who have the same coin on different exchanges or wallets.",
        panel4: "The last panel of the page is in charge to show your coins and data. Here you can set up their typology, their allocation, and their amount.",
        panel5: "As shown in the following screenshot, after saving your configuration, you can consult the data about rebalancing and coins' trend.",
        panel6: "Let's take a look into these three columns:",
        column1: "- The first column identifies the balance of the coin related to the percentage we decided to allocate for it.",
        column2: "- The second column is similar to the first one, but rather than the percentage, it shows the balance related to the fiat currency you have chosen.",
        column3: "- The last column tells how many coins you have to buy or sell to fix your balance gap.",
        outro: "We remind you that the platform is free and also available on mobile.\n\nWe wish you a pleasant use, and we will leave our email below to contact us.\n\n",
      },
      language: {
        successOnUpdate: "Language has been changed successfully",
        errorOnUpdate: "Error during update the language",
        errorOnFetch: "Error during fetch the language",
      },
    },
  },
  it: {
    translation: {
      general: {
        logoutButton: "Esci",
        errorPleaseReloadMessage: "Errore! Ricaricare la pagina",
        errorOfflineMessage: "Non sei online, controlla la connessione!",
        loadingMessage: "Caricamento",
        reload: "Ricarica",
      },
      validation: {
        notValidEmail: "Email non valida",
        atLeast6chars: "La password deve contenere almeno 6 caratteri",
        atLeast1Number: "La password deve contenere almeno un numero",
        atLeastUpperAndLowerCase: "La password deve contenere almeno una lettera maiuscola e una minuscola",
        atLeastSpecialChar: "La password deve contenere almeno un carattere speciale",
        notPasswordConfirm: "Le due password inserite non coincidono"
      },
      registration: {
        loginButton: "Accesso",
        registration: "REGISTRAZIONE",
        email: "Email",
        insertEmailPlaceholder: "Inserisci la email",
        password: "Password",
        confirmPassword: "Conferma la password",
        insertPasswordPlaceholder: "Inserisci la password",
        confirmPasswordPlaceholder: "Reinserisci la password",
        confirm: "Registrati",
        errorRegistration: "Errore durante la fase di registrazione",
      },
      login: {
        signinButton: "Registrazione",
        login: "ACCESSO",
        email: "Email",
        insertEmailPlaceholder: "Inserisci la email",
        password: "Password",
        insertPasswordPlaceholder: "Inserisci la password",
        recoverPassword: "Recupera Password",
        confirm: "Entra",
        errorLogin: "Errore durante la fase di accesso",
      },
      recoverPassword: {
        goRegistrationPageButton: "Torna alla pagina di accesso",
        recoverPassword: "RECUPERO PASSWORD",
        email: "Email",
        insertEmailPlaceholder: "Inserisci la email",
        sendRecoverEmail: "Invia Mail di Recupero",
        mailHasBeenSent: "Una email è stata inviata a {{email}} per il recupero della password",
        errorSendingEmail: "Errore durante il recupero della password",
      },
      waitingRegistration: {
        confirmEmail: "CONFERMA EMAIL",
        emailSentToConfirm: "Ti abbiamo inviato una mail di conferma all'indirizzo email",
      },
      registrationConfirming: {
        confirmSuccess: "Email verificata correttamente",
        confirmError: "Errore nel verificare l'email",
      },
      changePassword: {
        goLoginPageButton: "Torna alla pagina di accesso",
        changePassword: "CAMBIO PASSWORD",
        newPassword: "Nuova password",
        insertNewPassword: "Inserisci la nuova password",
        confirmPassword: "Conferma nuova password",
        passwordCorreclyChanged: "La password è stata cambiata correttamente",
        errorChangingPassword: "Errore durante il salvataggio della nuova password",
      },
      home: {
        updatePricesButton: "Aggiorna prezzi",
        editButton: "Modifica",
        saveButton: "Salva",
        cancelButton: "Cancella",
        coinsWithNoExistingTypologyChanges: "Le monete assegnate a tipologie che sono state rimosse ora hanno una tipologia vuota",
        pricesUpdateCompleted: "I prezzi sono stati aggiornati",
        pricesAlreadyUpdated: "I prezzi sono già aggiornati",
        prefCurrencyUpdateCompleted: "La valuta è stata cambiata in ",
        prefCurrencyShouldChangeVesting: "Attenzione! È necessario cambiare manualmente il totale investito in ",
        prefCurrencyUpdateError: "Modifiche relative al cambio della valuta non salvate",
        prefCurrencyFetchError: "Errore nel caricare la valuta",
        helloMessage: "Ciao",
        vesting: {
          title: "Sommario investimento:",
          totalInvested: "Totale investito",
          yourCoinsValue: "Controvalore monete",
          profitOrLoss: "Guadagno / Perdita",
          vestingCantBeZero: "Non puoi inserire 0 o meno come valore investito",
          editingCanceled: "Hai cancellato le modifiche al valore investito",
          updateCompleted: "Modifiche relative al totale investito salvate correttamente",
          updateError: "Modifiche relative al totale investito non salvate",
          fetchError: "Errore nel caricare il totale investito",
        },
        wallet: {
          title: "Allocazione portafoglio:",
          percentageSumNotCorrect: "La somma delle percentuali nel tuo portafoglio è {{amount}}, deve essere 100",
          typology: "Tipologia",
          percentage: "Percentuale",
          pieceTotal: "Corrispettivo",
          insertAtLeastOneTypology: "Inserisci almeno una tipologia",
          editingCanceled: "Hai cancellato le modifiche relative all'allocazione del portafoglio",
          cantInsertNegativeValue: "Non puoi inserire un numero negativo di allocazione percentuale",
          updateCompleted: "Modifiche relative all'allocazione del portafoglio salvate correttamente",
          updateError: "Modifiche relative all'allocazione del portafoglio non salvate",
          fetchError: "Errore nel caricare il portafoglio",
        },
        addCoin: {
          title: "Aggiungi le tue monete:",
          dropdownPlaceholder: "Scrivi o inserisci le tue monete",
          dropdownDisabledPlaceholder: "Finisci di modificare la sezione sotto",
        },
        coins: {
          title: "Allocazione asset e ribilanciamento:",
          allocationCantBeNegative: "Non puoi inserire una percentuale di allocazione negativa",
          percentageSumNotCorrect: "Non hai allocato la giusta percentuale a ogni tipologia:",
          allocationCorrect: "Giusto",
          allocationWrong: "Sbagliato",
          typologyCellTitle: "Tipologia",
          logoCellTitle: "Logo",
          symbolAndNameCellTitle: "Simbolo e nome",
          allocationCellTitle: "Allocazione",
          allocationCountervalueCellTitle: "Controvalore allocazione",
          priceCellTitle: "Prezzo",
          change24CellTitle: "Variazione 24 ore",
          coinsCellTitle: "Monete",
          holdingCellTitle: "Possesso in valuta",
          percentageBalanceCellTitle: "Bilanciamento percentuale",
          valueImbalanceCellTitle: "Sbilanciamento valore",
          rebalancingCoinsCellTitle: "Numero coin per ribilancio",
          cantInsertNegativeAllocationValue: "Non puoi inserire un numero negativo di allocazione percentuale",
          cantInsertNegativeCoinsValue: "Non puoi inserire un numero negativo di monete",
          editingCanceled: "Hai cancellato le modifiche alle monete",
          noCoinsMessage: "Inserisci almeno una moneta",
          updateCompleted: "Modifiche relative alle monete salvate correttamente",
          updateError: "Modifiche relative alle monete non salvate",
          fetchError: "Errore nel caricare le monete",
          typologyDropdownPlaceholder: "Tipologia",
          insertAtLeastOneCoin: "Inserisci almeno una moneta",
        },
      },
      info: {
        title1: "Benvenuto!",
        aboutProject:
          "Questa pagina ti aiuterà a capire di più riguardo al nostro progetto.\n\n\nSiamo due ingegneri e siamo appassionati di criptovalute.\n\n\nLa nostra visione consiste nel supportare le persone interessate alle criptovalute tramite una serie di strumenti.\nIl primo che presentiamo (e che abbiamo sviluppato ad ora) è quello che troverai in questa piattaforma: ",
        ourVisionBold: "un tool che ti aiuterà nel ribilanciamento di un portafoglio di criptovalute.",
        aboutRebalancing: "\n\nSe non sai ancora cosa è il ribilanciamento di un portafoglio puoi leggere qualcosa in più",
        hereRef: "qui",
        linkDescription: "(articolo di The Crypto Gateway sul ribilanciamento).",
        toolDescription: "Il tool che ti stiamo per presentare ti darà la possibilità di:",
        functionality1: "- salvare il totale di denaro investito fino ad oggi e calcolare in tempo reale perdita/guadagno in base alle criptovalute che possiedi",
        functionality2: '- strutturare un tuo portafoglio creando più "tipologie" di rischio e dedicando per ogni fetta la percentuale che riterrai più opportuna',
        functionality3: "- tracciare manualmente le criptovalute che possiedi: il numero di monete, la tipologia di appartenenza e l'allocazione dedicata alla moneta",
        applicationInfo: "Prima di passare alla guida su come utilizzare la piattaforma ci tenevamo a informarti che:",
        info1: "- la piattaforma non si collega a nessun exchange/wallet, le monete devono essere manualmente aggiunte, modificate e rimosse",
        info2: "- il servizio che offriamo è totalmente sperimentale e no profit",
        info3: "- i dati che raccogliamo sugli utenti sono salvati in un database protetto",
        info4: "- i dati riguardo alle monete (prezzo, variazione ecc) sono in linea con Coingecko.",
        info5: "- la piattaforma è in fase di beta testing, potrebbero perciò verificarsi bug o malfunzionamenti",
        helpFeedback: "Nel caso volessi darci un feedback, segnalarci un bug o altro puoi contattarci a",
        helpMail: "infowebfinance@gmail.com",
        title2: "Iniziamo!",
        introTutorial:
          "Il primo passo per iniziare a sfruttare le funzionalità della piattaforma è quello di avere bene in mente come strutturare un portafoglio.\n\nCome saprai è bene strutturare un portafoglio suddividendolo in tipologie di rischio, e allocando per ciascuna tipologia un'adeguata percentuale sul totale.\n\nOgni investitore ha una sua strategia! È importante capirla al più presto per mantenerla nel tempo e non agire con la pancia (ma con la testa).\n\nSe desideri leggere qualcosa in più riguardo a come strutturare un portafoglio ti consigliamo di leggere",
        linkDescription2: "(The Crypto Gateway).",
        registrationLink: "Per registratrti sull'applicazione clicca ",
        registrationPhase:
          "\n\nRiceverai un'email con alcune istruzioni, seguile e finalmente potrai iniziare a configurare il tracker per il tuo portafoglio.\n\nUna volta che il tuo account sara creato, ti ritroverai su questa pagina:",
        panel1:
          "Partendo dal primo pannello in alto a sinistra potrai inserire il totale investito. Una volta inserito il totale puoi cliccare su salva. Tale valore può essere aggionrato in qualsiasi momento, per esempio se decidi di comprare o vendere le tue crypto.",
        panel2:
          "Ora è il momento di modificare il portafoglio. Con il bottone verde '+' potrai aggiungere tipologie di rischio al tuo portafoglio, mentre con il bottone rosso '-' le potrai eliminare. Ricorda ceh sarai tu a scegliere i nomi e le percentuali per l'allocazione.",
        panel3:
          "Troverai inoltre una grossa barra di ricerca che ti aiuterà ad inserire le tue monete. Puoi aggiungere più volte le stesse monete. Questa funzionalità aiuterà gli utenti che hanno la stessa moneta su exchange o wallet differenti.",
        panel4: "Il seguente pannello ti permetterà di modificare, per ogni moneta, la tipologia di appartenenza, l'allocazione percetuale assegnata e il totale di posseduto.",
        panel5: "Dopo aver salvato i tuoi dati, potrai vedere il ribilanciamento e l'andamento delle tue monete. Prendiamo come esempio questo screenshot:",
        panel6: "Andiamo a vedere queste tre colonne:",
        column1:
          "- La prima colonna identifica quanto una moneta è bilanciata. Nella prima riga USDC è bilanciata al 45%, il che vuol dire che possiedi solamente il 45% di monete USDC che dovresti possedere per avere l'asset bilanciato.",
        column2:
          "- La seconda colonna identifica quanto sei sbilanciato in valore euro/dollaro. Nella prima riga USDC è sbilanciato di 108.85€, il che vuol dire che per ribilanciare la posizione dovresti comprare un totale di USDC per un controvalore di 108.85€.",
        column3:
          "- La terza colonna identifica quante monete servono per il bilanciamento. Nella prima riga USDC deve essere ribilanciata di 119.769 monete, il che vuol dire che dovresti comprare 119.769 USDC per bilanciare la posizione.",
        outro:
          "Ti ricordiamo che la piattaforma è completamente gratuita e disponibile anche in veresione mobile.\n\nTi auguriamo un piacevole utilizzo e lasciamo di seguito l'indirizzo email per contattarci.\n\n",
      },
      linguaggio: {
        successOnUpdate: "La lingua è stata modificata con successo",
        errorOnUpdate: "Errore durante l'aggiornamento della lingua",
        errorOnFetch: "Errore durante il recupero della lingua",
      },
    },
  },
};
