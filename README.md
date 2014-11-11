Cash Register
============

The Problem
-----------
Creative Cash Draw Solutions is a client who wants to provide some fun for the users of their system (typically cashiers). The function of the application is to tell the cashier how much change to return to the user, and what denominations to do use when returning the change. In most cases the app should return the minimum amount of physical change, but the client would like to add a twist. If the "owed" amount is divisible by 3, the app should randomly return change denominations (but remember the algorithm needs to complete as well). 

Please write a program which accomplishes the clients goals. The program should:

1. Accept a flat file as input
	1. Each line will contain the amount owed and the amount paid separated by a comma (for example, 2.13,3.00)
	2. Expect that there will be multiple lines
2. Output the change the cashier should return to the customer
	1. The return string should look like: 1 dollar,2 quarters,1 nickel, etc ...
	2. Each new line in the input file should be a new line in the output file

Sample Input
------------
2.12,3.00
1.97,2.00
3.33,5.00

Sample Output
-------------
3 quarters,1 dime,3 pennies
3 pennies
1 dollar,1 quarter,6 nickels,12 pennies

*Remember the last one is random

The Fine Print
--------------
Please use whatever technology and techniques you feel are applicable to solve the problem. We suggest that you approach this exercise as if this code was part of a larger system. The end result should be representative of your abilities and style.

Please fork this repository. When you have completed your solution, please issue a pull request to notify us that you are ready.

Have fun.