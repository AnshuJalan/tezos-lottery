import smartpy as sp

#Functionalities: 
# 0.01 XTZ per lottery ticket
# Max 5
class SimpleLottery(sp.Contract):
    def __init__(self):
        self.init(limit = 5, ticketToAddress = sp.map(tkey = sp.TNat, tvalue = sp.TAddress), id = 0, previousWinners = sp.list(t = sp.TAddress))
    
    @sp.entry_point
    def buyTicket(self, qty):
        sp.verify(sp.mutez(qty * 10000) == sp.amount)
        
        change = sp.local('change', sp.mutez(0))
        canBuy = sp.local('canBuy', qty)
        remaining = sp.as_nat(self.data.limit - self.data.id)
        sp.if qty > remaining:
            canBuy.value = remaining
            change.value = sp.mutez(10000 * sp.as_nat(qty - remaining))
        
        sp.for i in sp.range(1, canBuy.value + 1):
            self.data.ticketToAddress[self.data.id] = sp.sender
            self.data.id += 1
        
        #send change if any
        sp.if change.value > sp.tez(0):
            sp.send(sp.sender, change.value)
        
        #check lottery over
        sp.if self.data.id == 5:
            self.selectWinner()
            self.resetLottery()
    
    def selectWinner(self):
        #random id
        randomId = (sp.timestamp_from_utc_now() - sp.timestamp(0)) % 5
        
        #pay out
        sp.send(self.data.ticketToAddress[randomId], sp.mutez(50000))
        self.data.previousWinners.push(self.data.ticketToAddress[randomId])
        
    
    def resetLottery(self):
        self.data.id = 0
        sp.for i in sp.range(0, self.data.limit):
            del self.data.ticketToAddress[i]
        
            
@sp.add_test(name = "Lottery Test")
def test():
    #Accounts
    alice = sp.test_account('Alice')
    bob = sp.test_account('Bob')
    john = sp.test_account('John')
    anshu = sp.test_account('Anshu')
    ronak = sp.test_account('Ronak')
    
    scenario = sp.test_scenario()
    c = SimpleLottery()
    scenario += c
    
    scenario.h1('Lottery Test')
    
    scenario += c.buyTicket(1).run(sender = alice, amount = sp.mutez(10000))
    scenario += c.buyTicket(1).run(sender = bob, amount = sp.mutez(10000))
    scenario += c.buyTicket(1).run(sender = john, amount = sp.mutez(10000))
    scenario += c.buyTicket(1).run(sender = ronak, amount = sp.mutez(10000))
    
    scenario.h3('Buy Multiple (Change)')
    scenario += c.buyTicket(3).run(sender = anshu, amount = sp.mutez(30000))
    
    scenario.h3('Final Contract Balance')
    
    scenario.show(c.balance)