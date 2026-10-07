Feature: Feature validation
@Regression
  Scenario: Placing the order
  Given a login to Ecommerce application with some "user111@yopmail.com" and "Password1@"
    When I add "ZARA COAT 3" to cart
    Then verify that "ZARA COAT 3" is displayed in the Cart
    When enter value details and place order
    Then verify order is displayed on the OrderHistory


    
   @parameterization
   Scenario Outline: Scenario Outline name: Placing the order
  Given a login to Ecommerce2 application with some "<username>" and "<password>"
    Then Verify that error Message is displayed

    Examples:
        | username | password 
        | rahulshetty | Learning@830$3mK2 
        |hello123|hello1234