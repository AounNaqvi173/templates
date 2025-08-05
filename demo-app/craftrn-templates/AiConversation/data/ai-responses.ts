export const mockAiResponses = [
  `Absolutely! Here are some healthy swaps that will keep your cookies delicious:

**Flour Alternatives:**
- Replace half the all-purpose flour with almond flour or oat flour for added protein and fiber
- Try whole wheat pastry flour for a nuttier flavor

**Sugar Reductions:**
- Replace half the sugar with mashed banana or unsweetened applesauce
- Use coconut sugar or maple syrup (reduce liquid ingredients slightly)
- Try stevia or monk fruit sweetener (use conversion charts)

**Fat Improvements:**
- Substitute half the butter with Greek yogurt or mashed avocado
- Use coconut oil instead of butter for a subtle tropical note

*Note:* It's crucial to remember that ~~one-size-fits-all substitutions~~ gradual changes work best. When baking healthier cookies, you might use something like \`1:1 ratio\` or \`3/4 substitution\` depending on your recipe complexity.

Start by changing just one or two ingredients at a time to see how you like the results!`,

  `Excellent! Here are storage tips for healthier cookies:

**Storage Methods:**
- Store in an *airtight container* at room temperature for up to \`5-7 days\`
- For longer storage, freeze them for up to \`3 months\`
- ~~Don't store in the fridge~~ - this can make them stale

*Pro tip:* Place a slice of bread in the container to keep cookies soft!

**Special Considerations:**
- Cookies with Greek yogurt may have shorter shelf life
- Those with fresh fruit should be eaten quickly, usually within \`2-3 days\`
- **Label containers** with the date and ingredients for easy reference

*Important caveat:* While these storage methods work well in theory, ~~avoid overpacking containers~~ ensure you leave some air space. A simple \`date label\` is often better than trying to remember when you baked them.

Would it be helpful if I walked through how these different storage methods might apply to your specific cookie types?`,

  `I love this question because cookie baking is both practically important and scientifically fascinating! Let me share some thoughts that might be useful.

**The short answer is:** It depends on your specific recipe and dietary goals. **The longer answer is much more interesting.**

What I find compelling about cookie modifications is how it reveals the tension between health and taste. On one hand, you want to make cookies as nutritious as possible. On the other hand, you need to maintain that delicious flavor and texture everyone loves.

**Here's a framework I often find helpful:** Think of cookie modifications as having three layers:

- **Base layer:** The fundamental ingredients (flour, sugar, fat) that provide structure
- **Flavor layer:** Additions like vanilla, chocolate chips, nuts that create taste  
- **Health layer:** The nutritional modifications that boost fiber, protein, and reduce sugar

*Pro tip:* Don't get caught up in ~~perfectionist health goals~~ endless substitutions. Sometimes you just need to bake a batch with \`one swap\` and see what happens!

The key is developing what I call "baking intuition" - the ability to understand how ingredients interact while maintaining the cookie's essential character. Does this resonate with your baking experience, or are there specific substitutions you'd like to explore further?`,

  `This is such a great question, and I think it highlights something really important about how we approach baking modifications in general.

**What strikes me most about cookie baking** is how it exemplifies the broader principle that the most delicious results often emerge from understanding the science behind ingredients. You're essentially asking about substitutions, but the answer requires considering chemistry, nutrition, texture science, and taste preferences all at once.

**Let me offer a different lens for thinking about this:** Instead of looking for the "perfect" healthy cookie, what if we focused on developing a robust modification process? This shifts the question from "What should I substitute?" to "How should I think about substitutions?"

**Here's what I mean:** Create a testing framework that can adapt to different recipes rather than rigid swaps. This might include:

- **Ratio-based guidelines** that help you evaluate substitutions consistently
- **Taste test loops** that allow you to course-correct based on actual results
- **Texture planning** that prepares you for different possible outcomes
- **Nutrition tracking** that ensures your modifications align with your health goals

*Remember:* ~~Rigid substitution rules~~ flexible experimentation works best in diverse recipes. Think of it like writing \`recipe.test()\` - you prepare for multiple outcomes while keeping your base recipe solid.

I'm curious - does this perspective shift how you're thinking about your cookie modifications? And are there particular aspects of building such a testing framework that seem most challenging or interesting to you?`,

  `Oh, this is one of those questions that gets to the heart of so many interesting baking trade-offs! I find myself returning to cookie questions like this frequently because they reveal how much our default assumptions about "healthy" shape our baking.

**Let me start with what I think is the most important insight:** The question itself might be more valuable than any specific recipe swap. Here's why: by asking this, you're demonstrating exactly the kind of thoughtful approach that leads to better cookies in complex dietary situations.

**Consider this parallel:** When expert bakers modify a recipe, they don't just swap ingredients randomly - they develop an intuitive understanding of how each ingredient functions, what role it plays in texture and flavor, and how changes might affect the final result. Similarly, your question suggests you're not just looking for a quick substitute, but trying to understand the underlying baking science.

**What fascinates me about cookie modification** is how it sits at the intersection of several different areas of knowledge. There's the practical chemistry aspect (how do different flours behave?), the nutritional science aspect (what nutrients do we gain vs. lose?), and the sensory aspect (how do texture and taste changes affect enjoyment?).

**Here's what I'd encourage you to consider:** Rather than seeking the perfect healthy cookie immediately, what if you invested some time in really understanding your ingredient options? This might involve testing small batches, identifying flavor preferences, exploring texture variations, and thinking through nutritional trade-offs.

*Final thought:* Don't let ~~ingredient perfectionism~~ endless substitutions derail your baking joy. Sometimes a simple \`taste.test()\` with one swap reveals more than hours of nutritional analysis.

What aspects of this ingredient exploration seem most relevant or interesting for your specific cookie goals?`,
];

export const getRandomAiResponse = (): string => {
  return mockAiResponses[Math.floor(Math.random() * mockAiResponses.length)];
};
