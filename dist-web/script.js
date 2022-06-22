const loginBtn = document.getElementById("login").addEventListener("click", handleLogin)
const signBtn = document.getElementById("sign").addEventListener("click", handleSign)


const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
    //userAccount: 'vinymaxterrr',
    //pubKeys: ["EOS55uLpgm5dmPCcBTUsBaSZtEzjpAXbEMqVbBHAmWnbVAepu4LtX", "EOS5fwbp68yH7Ldb2Bc64Ea8qSzEZK9nYa538skjoWzpHMGwXXzrs"]
});

autoLogin(); 

//checks if autologin is available and calls the normal login function if it is 
async function autoLogin() { 
    var isAutoLoginAvailable = await wax.isAutoLoginAvailable(); 
    if (isAutoLoginAvailable) { 
        var isAutoLoginAvailable = await wax.isAutoLoginAvailable();
         var userAccount = wax.userAccount
        var pubKeys = wax.pubKeys
    } 
} 

//normal login. Triggers a popup for non-whitelisted dapps
async function handleLogin() { 
    try { 
        const userAccount = await wax.login(); 
        const pubKeys = wax.pubKeys;
        if (!pubKeys) {
          console.log("Falta Key")
        }
        else {
        console.log(pubKeys)
        }
    } catch(e) { 
        document.getElementById('response').append(e.message);
    } 
}


async function handleSign() {

    const updater = document.getElementById('updater').value;
    const message = document.getElementById('message').value;
    const fail = document.getElementById('fail').checked;



    try {
      const result = await wax.api.transact({
        actions: [{
            account: "boost.wax",
            authorization: [
              {
                actor: "cpusolutions",
                pubKeys: ["PUB_K1_7BshxXx83pLBXwtrnKQ3nQo7Lhs2UraB5BdccdBwPLc9AukKSH", "PUB_K1_5EVmRVrCyCPyD9faZX4VQk4Cj6ga88hdir8KMaiGoGi4S6gU2n"],
                permission: "active",
              },
            ],
            data: null,
            hex_data: "",
            name: "noop"
      
      
        }]
        }, {
        blocksBehind: 3,
        expireSeconds: 30
        });

      document.getElementById('response').append(JSON.stringify(result));
      await new Promise(resolve => setTimeout(resolve, 1000));
      await getCurrentMessage();
    } catch(e) {
      document.getElementById('response').append(e.message);
    }
  }
  