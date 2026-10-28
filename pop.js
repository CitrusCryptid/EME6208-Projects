//change 5 to the total number of questions
var total=10
var question=new Array()
for (i=1;i<=total+1;i++){
temp="choice"+i+"=new Array()"
eval(temp)
}
var solution=new Array()

/*Below lists the phrases that will be randomly displayed if the user correctly answers the question. You may extend or shorten this list as desired*/
var compliments=new Array()
compliments[0]="Wahoo!"
compliments[1]="Super!"
compliments[2]="Amazing!"
compliments[3]="AWESOME."
compliments[4]="Perfect!"
compliments[5]="Yippee!"
compliments[6]="Yessss!"
compliments[7]="You're on FIRE!"
compliments[8]="FABULOUS!"
compliments[9]="You ROCK!"
compliments[10]="Yabadabadoo!"


/*Below lists the questions, its choices, and finally, the solution to each question. Folow the exact format below when editing the questions. You may have as many questions as needed. Check doc at http://javascriptkit.com/script/script2/comboquiz.htm for more info
*/

question[1]="What type of primate is a gibbon?"
choice1[1]="A great ape"
choice1[2]="A lesser ape"
choice1[3]="A monkey"
choice1[4]="A lemur"

question[2]="On which continent do gibbons live naturally in the wild?"
choice2[1]="Africa"
choice2[2]="South America"
choice2[3]="Asia"
choice2[4]="Australia"

question[3]="What is the primary way gibbons move through the forest canopy?"
choice3[1]="Swinging from branch to branch"
choice3[2]="Swimming between trees"
choice3[3]="Gliding between branches"
choice3[4]="Walking on all four limbs along the ground"

question[4]="What feature helps gibbons swing efficiently between branches?"
choice4[1]="Their long tails"
choice4[2]="Their large hind feet"
choice4[3]="Their broad wings"
choice4[4]="Their long arms"

question[5]="Which of the following is a great ape?"
choice5[1]="Gibbon"
choice5[2]="Baboon"
choice5[3]="Orangutan"
choice5[4]="Capuchin monkey"

question[6]="What is an important role of gibbons' loud calls in the wild?"
choice6[1]="Helping them locate underground food"
choice6[2]="Communicating and defending their territories"
choice6[3]="Warning fish of nearby predators"
choice6[4]="Attracting insects for food"

question[7]="What is the main component of most gibbons' diets?"
choice7[1]="Fish and shellfish"
choice7[2]="Grass and tree bark"
choice7[3]="Meat from large mammals"
choice7[4]="Fruit"

question[8]="Which characteristic distinguishes apes from monkeys?"
choice8[1]="Apes lack external tails"
choice8[2]="Apes always live on the ground"
choice8[3]="Apes are all larger than monkeys"
choice8[4]="Apes have feathers instead of fur"

question[9]="What is the name of the movement in which gibbons swing beneath branches using their arms?"
choice9[1]="Quadrupedalism"
choice9[2]="Brachiation"
choice9[3]="Bipedal hopping"
choice9[4]="Burrowing"

question[10]="Which of these primates is the closest living relative of humans among the following choices?"
choice10[1]="Gibbon"
choice10[2]="Macaque"
choice10[3]="Chimpanzee"
choice10[4]="Lemur"

solution[1]="b"
solution[2]="c"
solution[3]="a"
solution[4]="d"
solution[5]="c"
solution[6]="b"
solution[7]="d"
solution[8]="a"
solution[9]="b"
solution[10]="c"