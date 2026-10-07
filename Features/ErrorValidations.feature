Feature: Feature validation
@parameterization
  Scenario Outline: Scenario Outline name: Placing the order
  Given a login to Ecommerce2 application with some "<username>" and "<password>"
    Then Verify that error Message is displayed

    Examples:
        | username | password 
        | rahulshetty | Learning@830$3mK2 
        |hello123|hello1234