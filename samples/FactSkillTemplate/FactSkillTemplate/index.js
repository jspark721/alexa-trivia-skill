/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Chicken conatins 266% more fat than it did 40 years ago.",
    "Carrots were originally purple.",
    "Honey is the only food that will never rot, it can last 3,000 years.",
    "Eating fast food regularly has the same impact on the liver as hepatitis.",
    "People who eat spicy foods tend to live longer, according to a 2015 study.",
    "Apricots help your body fight infections.",
    "Blackberries help your body's production of red and white blood cells.",
    "Grapefruits can be used to help heal wounds.",
    "Guavas prevent skin damage.",
    "Lemons aid in digestion.",
    "The smell of chocolate increates theta brain waves, which helps you relax.",
    "Drinking 2 ounces of wheatgrass is the equivalent to eating 4 pounds of green vegetables.",
    "Pumpkin is a nutritional powerhouse, rich in vitamins, minerals, and antioxiants.",
    "Pears contain antioxidants such as vitamin C and copper and can help treat arthritis.",
    "Eating lots of fruits lowers the risk of developing chronic disease.",
    "Water content in fruit makes your skin more soft, supple & glowing.",
    "Fruits are high in fiber, helping ward off fats, and cholesterol from the body.",
    "Fruits help prolong the natural changes of aging by protecting and rejuvenating cells.",
    "Cucumbers help relieve joint pain, reduce cholesterol, aid in weight loss, promote digestion and prevents headaches.",
    "Spinach strengthens the immune system, promotes healthy, glowing skin and fights diseases.",
    "Thanks to using less cream and more milk, gelato has a lower fat content than ice cream. It's churned slower to give it a dense and creamy texture.",
    "If you're only going to use half of a bell pepper, cut it in half the short way, and save the top half. The stem will keep it fresh longer.",
    "Green tea boosts your metabolism which can help with weight loss.",
    "Calcium has been proven to increase metabolism and decrease body fat. It also makes you feel better as it's needed to release the neuro-chemical serotonin.",
    "Vitamin A is good for eyes, teeth and skin.",
    "Vitamin B is good for immune function, iron absorption, and energy production.",
    "Vitamin C is good for strengthening blood vessels, skin elasticity, antioxidant function.",
    "Vitamin D is good for strong, healthy bones.",
    "Vitamin E is good for protection from free radicals and improves blood circulation.",
    "Top 10 healthy foods you should eat everyday are: green tea, oranges, tomatoes, yogurt, walnuts, eggs, apples, olive oil, cinnamon.",
    "If you're craving sweets, you're missing chromium, carbon phosphorus and sulfer. Try eating broccoli, grapes, cheese, sweet potato, eggs, kale, dried beans, chicken, fresh fruits.",
    "If you're craving bread, you're missing nitrogen. Try eating high protein foods such as fish, meat, nuts, and beans.",
    "45 minutes of exercise 3 times a week can result in cells that show fewer signs of aging",
    "Apple cider vinegar can help boost weight loss as it speeds up motabolism.",
    "Apple cider vinegar can lower blood cholesterol and prevent indigestion.",
    "Apple cider vineger can be used as a natural acne remedy, a natural teeth whitener, and a natural deodrant.",
    "Raspberries help your body with your metabolism.",
    "Kale is considered one of the healthiest super foods on the planet. It detoxifies your body additionally to prevent cancer and heart diseases.",
    "Cashew nuts are packed with monosaturated fats which give a healthy heart.",
    "The only fruit that has its seeds on the outher skin is a strawberry.",
    "Almonds are members of the peach family.",
    "Almonds are the most alkalizing of all the nuts, they are rich in phosphorus, manganese, b12 and vitamin E. They can lower high cholesterol. But it must be eaten in moderation because of the high fat content.",
    "Spices like cinnamon, cayenne pepper, mustard seed, ginger and black pepper can help with weight loss."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a healthy food fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

