App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x6E92415db39d065C893b47A088735fc4900bD360",
    originPhotographerID: "0x972A3AbDd638008fDeE0e1EBC1eDa8ABD0fc0F4E",
    originPhotographerName: null,
    photoNotes: null,
    photoPrice: 0,
    editorID: "0x4fDe620d55D83e1AFa292370a3D5324689592B11",
    customerID: "0x7D510Dc5CeDd3858043b25D2ad8251047c89a98d",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originPhotographerID = $("#originPhotographerID").val();
        App.originPhotographerName = $("#originPhotographerName").val();
        App.photoNotes = $("#photoNotes").val();
        App.photoPrice = $("#pphotoPrice").val();
        App.editorID = $("#editorID").val();
        App.customerID = $("#customerID").val();

        console.log(
            App.upc,
            App.ownerID, 
            App.originPhotographerID, 
            App.originPhotographerName, 
            App.photoNotes, 
            App.photoPrice, 
            App.editorID, 
            App.customerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
           // App.web3Provider = new Web3.providers.WebsocketProvider('ws://localhost:7545');
            //let web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8545'))
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.takePhoto(event);
                break;
            case 2:
                return await App.editPhoto(event);
                break;
            case 3:
                return await App.addPhoto(event);
                break;
            case 4:
                return await App.buyPhoto(event);
                break;
            case 5:
                return await App.sendPhoto(event);
                break;
            case 6:
                return await App.receivePhoto(event);
                break;
            case 7:
                return await App.purchasePhoto(event);
                break;
            case 8:
                return await App.fetchPhotoBufferOne(event);
                break;
            case 9:
                return await App.fetchPhotoBufferTwo(event);
                break;
            }
    },

    takePhoto: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.takePhoto(
                App.upc, 
                App.metamaskAccountID, 
                App.originPhotographerName, 
                App.photoNotes
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('takePhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    editPhoto: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.editPhoto(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('editPhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    addPhoto: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addPhoto(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyPhoto: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const photoPrice = web3.toWei(1, "ether");
            console.log('photoPrice',photoPrice);
            return instance.buyPhoto(App.upc, App.photoPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyPhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sendPhotp: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.sendPhoto(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sendPhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receivePhoto: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receivePhoto(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receivePhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchasePhoto: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchasePhoto(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchasePhoto',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchPhotoBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchPhotoBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchPhotoBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchPhotoBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchPhotoBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchPhotoBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
