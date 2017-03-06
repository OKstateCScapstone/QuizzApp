const self = {};

const starterCode = "public class HelloWorld {\n" +
    "\n" +
    "   public static void main(String[] args) {\n" +
    "       \n" +
    "   }\n" +
    "}\n" +
    "";

const completeSolution = "public class HelloWorld {\n" +
    "\n" +
    "   public static void main(String[] args) {\n" +
    "       \n" +
    "       System.out.println(\"Hello World\")\n" +
    "   }\n" +
    "}\n" +
    "";

self.singleQuestion = {
    _id: "58bb4a97de9d8a5e38ee75c4",
    title: "Title",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultrices dolor sed nunc posuere commodo. " +
    "Aenean hendrerit felis a sapien maximus aliquam. Integer venenatis ipsum dolor, id gravida urna porta cursus. " +
    "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " +
    "Sed hendrerit varius velit, et imperdiet elit faucibus a. Nulla facilisi. Nullam placerat tempor laoreet. " +
    "Cras blandit ligula at eros blandit, a mollis nibh hendrerit. Ut pretium vitae mauris in varius. " +
    "In hac habitasse platea dictumst. Integer quis faucibus massa. " +
    "Nam mattis eleifend dui, et lobortis sapien ullamcorper quis. Nam non ligula enim.",
    language: 'Java',
    topics: 'if statements, while loops, printf',
    difficulty: 'Easy',
    activeDate: new Date(),
    dueDate: new Date(),
    updatedAt: new Date(),
    starterCode: starterCode,
    completeSolution: completeSolution,
    points: 15
};

module.exports = self;
