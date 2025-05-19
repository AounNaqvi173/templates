import { User, usersData } from './users';

export type Discussion = {
  id: string;
  participants: User[];
  lastMessage: Message;
  messages: Message[];
};

export type Message = {
  id: string;
  date: string;
  content: string[];
  senderId: string;
};

export const discussionsData: Discussion[] = [
  {
    id: '7d3463b7-9acd-4ee3-8d0e-3c28fab32945',
    participants: [usersData[0], usersData[3]],
    lastMessage: {
      id: 'e4b71542-89c8-4be3-9cd5-a11d4c863817',
      date: new Date(Date.now() - 3 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'I think we’re done with the design, let’s start implementing it. And we should also add a lot of testimonials from happy customers.',
      ],
      senderId: usersData[3].id,
    },
    messages: [
      {
        id: 'a9b1bcb8-82fc-4c08-b2a0-df4ff1b3948d',
        date: new Date(
          Date.now() - (3 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Hey, let’s start working on the new design for the landing page. I’ve been studying the competition and I believe we can create something truly unique.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'bcac48b2-66fc-43a2-b7be-15901b99f0bc',
        date: new Date(
          Date.now() - (3 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Sure, how do you think we should approach this? We need to make sure the page stands out and is easy to navigate. Also, we should highlight our unique selling points and make it clear how our product/service is better than the competition.',
        ],
        senderId: usersData[3].id,
      },
      {
        id: 'cb59cfe1-35d2-4747-94e4-e21b7e56bfc3',
        date: new Date(
          Date.now() - (3 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I agree, on the design. I think we should make it modern and visually appealing. And on the content, we should make sure to use a lot of contrast and white space to make it easy to read.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'd9fc2f04-efda-4373-9c9a-67f0f08f57b4',
        date: new Date(
          Date.now() - (3 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I completely agree. We should also make sure the buttons are large and easy to click. And we should add a lot of testimonials from happy customers.',
        ],
        senderId: usersData[3].id,
      },
      {
        id: 'eb1d08a1-7382-41d3-b9da-8bfcf6d64861',
        date: new Date(
          Date.now() - (3 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I’m not sure about that, I think a smaller heading would be better. And we should add a lot of images to make it more visually appealing.',
          'I agree, on the design. I think we should make it modern and visually appealing. And on the content, we should make sure to use a lot of contrast and white space to make it easy to read.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'fa2b4915-815e-44fa-93ab-5d2825e4fbe3',
        date: new Date(
          Date.now() - (3 * 24 + 0.7) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I completely agree. We should also make sure the buttons are large and easy to click. And we should add a lot of testimonials from happy customers.',
          'I’m not sure about that, I think a smaller heading would be better. And we should add a lot of images to make it more visually appealing.',
          'Hey, let’s move on to the content of the page. We should make sure to highlight our unique selling points and make it clear how our product/service is better than the competition.',
        ],
        senderId: usersData[3].id,
      },
      {
        id: '0a315c0f-18e6-4e9a-8e3a-68958289f0f8',
        date: new Date(
          Date.now() - (3 * 24 + 0.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Sure, let’s focus on showcasing our products and services. We should make sure to use a lot of contrast and white space to make it easy to read.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '1b43229c-25b3-4852-825b-9ff8e657d84b',
        date: new Date(
          Date.now() - (3 * 24 + 0.3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I think we’re done with the design, let’s start implementing it. And we should also add a lot of testimonials from happy customers.',
        ],
        senderId: usersData[3].id,
      },
    ],
  },
  {
    id: '9c12c247-d7a8-4ae2-9d5f-8c1f9c9b1d58',
    participants: [usersData[0], usersData[7]],
    lastMessage: {
      id: 'b4fd6716-9fd0-4ae4-b40a-900c70f1fdbf',
      date: new Date(Date.now() - 4 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['Great! I’ll draft some tooltips and the tutorial script.'],
      senderId: usersData[7].id,
    },
    messages: [
      {
        id: '610aee1e-ede6-439c-9ddc-1402a35e7ba3',
        date: new Date(
          Date.now() - (4 * 24 + 3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'How do you think the user testing went for the new feature? I noticed that some participants seemed to struggle with certain aspects of the interface. It could be beneficial for us to gather all feedback and pinpoint the main issues that users are facing. Maybe there are common patterns or areas that need improvement. What are your thoughts? Do you think this could help us enhance the overall user experience?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '4ad6877e-9aae-488c-babd-ff795e70935b',
        date: new Date(
          Date.now() - (4 * 24 + 2.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'It went well overall, but some users were confused by the navigation. I think the feedback will be invaluable in refining our design. We need to streamline the navigation to make it more intuitive. Perhaps simplifying some menu options or reorganizing them could help. Additionally, incorporating visual cues might assist users in finding what they need without feeling overwhelmed. We should also consider how tooltips or brief descriptions can enhance navigation clarity. Your thoughts on this?',
        ],
        senderId: usersData[7].id,
      },
      {
        id: '39ea7e95-70b3-4cf8-a98a-c2ddbf74198a',
        date: new Date(
          Date.now() - (4 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Agreed. Should we simplify the menu options? A streamlined menu could guide users more effectively. By reducing the number of options, we can focus their attention on the most important features and sections. This might also help in reducing cognitive load. Maybe we could also test different layouts to see which one resonates best with our target audience. It would be great to have some data backing up these decisions. What do you think about conducting further testing on this?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'ec6233a5-7467-47ab-914e-f08fcfcde7de',
        date: new Date(
          Date.now() - (4 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Yes, and maybe add some tooltips for guidance. Tooltips can provide instant help without cluttering the interface. Users can hover over an element to get more information or instructions. This way, we can offer support exactly when and where it’s needed, without overwhelming them with too much information at once. It’s all about creating a balance between guidance and simplicity. Additionally, a short tutorial that introduces key features could be beneficial. What’s your take on using tooltips in this manner?',
        ],
        senderId: usersData[7].id,
      },
      {
        id: '2abfa495-a7c1-42bf-94ed-69df76521c61',
        date: new Date(
          Date.now() - (4 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Good idea. We should also consider a short tutorial. A tutorial can serve as an onboarding tool for new users, ensuring they understand how to navigate and utilize the platform’s features. It could highlight essential functions and offer tips for maximizing the user experience. This proactive approach can reduce frustration and support users in achieving their goals efficiently. Let’s brainstorm how we can implement this tutorial and what key points it should cover. Any initial ideas on its structure or content?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '3272ebd5-10e1-4aae-b7f1-6dbe14cf6373',
        date: new Date(
          Date.now() - (4 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I agree. A tutorial could help new users get started. By providing a step-by-step guide, we can ensure users are familiar with the platform from the start. This can significantly enhance their initial experience and encourage long-term engagement. We should also consider making the tutorial interactive, allowing users to explore features hands-on. This approach can cater to different learning styles and ensure users feel confident in using the platform. What interactive elements do you think we should include to make the tutorial engaging?',
        ],
        senderId: usersData[7].id,
      },
      {
        id: '7be5a79b-e685-4163-b29d-24a9f83f0af7',
        date: new Date(
          Date.now() - (4 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'We should also collect feedback on the tutorial effectiveness. After users complete the tutorial, it would be beneficial to gather their thoughts and suggestions. This feedback can provide insights into what aspects of the tutorial were helpful and what might need improvement. Understanding their perspective can guide us in refining the tutorial and make it even more effective for future users. Perhaps a short survey or feedback form at the end of the tutorial could capture their experiences. How do you feel about incorporating user feedback into our tutorial development process?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '16d96530-9b8b-4788-8f6a-0f4a64ee9c14',
        date: new Date(
          Date.now() - (4 * 24 + 0.7) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Definitely. Let’s add a feedback form at the end of the tutorial. This will help us continuously improve the onboarding process. Users’ input is invaluable in understanding their needs and pain points. By addressing their concerns and integrating their suggestions, we can create a more user-friendly experience. It’s crucial to maintain an open dialogue with our users to ensure the platform evolves to meet their expectations. What specific questions do you think would be most helpful to include in the feedback form to gather actionable insights?',
        ],
        senderId: usersData[7].id,
      },
      {
        id: '8efefe4c-cdb7-449b-889b-204f2a99facd',
        date: new Date(
          Date.now() - (4 * 24 + 0.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Perfect. I’ll start working on the simplified menu today. A cleaner, more intuitive navigation can dramatically improve user satisfaction. Users should be able to find what they need quickly and effortlessly. I’ll review the current structure and look for areas where we can consolidate or eliminate unnecessary options. By focusing on the user’s journey and what they want to achieve, we can tailor the menu to better serve their needs. I’ll share my initial designs once they’re ready for feedback. Looking forward to your thoughts!',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'b4fd6716-9fd0-4ae4-b40a-900c70f1fdbf',
        date: new Date(
          Date.now() - (4 * 24 + 0.3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Great! I’ll draft some tooltips and the tutorial script. These elements will complement the simplified menu and provide users with a comprehensive understanding of the platform. The tooltips will offer immediate guidance, while the tutorial will provide a deeper dive into features and functionality. Together, they will create a cohesive onboarding experience. I’ll ensure the script is clear, concise, and engaging, highlighting the benefits and value of using our platform. I’ll keep you updated on the progress and would love to hear your feedback once the draft is ready.',
        ],
        senderId: usersData[7].id,
      },
    ],
  },
  {
    id: 'f5b6d8a2-e3c7-4b1f-9d8e-4a5b6c7d8e9f',
    participants: [usersData[0], usersData[9]],
    lastMessage: {
      id: '550e8400-e29b-41d4-a716-446655440004',
      date: new Date(Date.now() - 9 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'Absolutely, I will work on that. I think adding some dynamic color schemes based on data values will also make the charts more interactive. Let’s aim for a design review by the end of the week.',
      ],
      senderId: usersData[9].id,
    },
    messages: [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        date: new Date(
          Date.now() - (9 * 24 + 2.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'What do you think about the new UI for the dashboard? I believe it has a lot of potential to improve user experience, but I would love to hear your detailed feedback on the layout and functionality.',
        ],
        senderId: usersData[9].id,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        date: new Date(
          Date.now() - (9 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I like it, but the font size seems a bit small. It makes reading the information somewhat straining. We could consider increasing it slightly to enhance readability for all users.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        date: new Date(
          Date.now() - (9 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Good point. We should increase it by at least 2 points. Additionally, we might want to review the color scheme to ensure that it is visually accessible to all users, including those with visual impairments.',
        ],
        senderId: usersData[9].id,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        date: new Date(
          Date.now() - (9 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Also, can we make the charts more colorful? Right now, they look a bit dull and it’s hard to differentiate between the various data points at a glance. Vibrant colors can help in better visual representation and quicker analysis.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        date: new Date(
          Date.now() - (9 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Absolutely, I will work on that. I think adding some dynamic color schemes based on data values will also make the charts more interactive. Let’s aim for a design review by the end of the week.',
        ],
        senderId: usersData[9].id,
      },
    ],
  },
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    participants: [usersData[0], usersData[2]],
    lastMessage: {
      id: 'a8b013aa-b7be-4534-aa4d-6b593b5dfe10',
      date: new Date(Date.now() - 10 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'Sounds good. Let’s start setting up the project structure. We can create separate folders for frontend and backend, establish coding conventions, and define our initial project milestones.',
      ],
      senderId: usersData[2].id,
    },
    messages: [
      {
        id: '8a3a6192-0271-4a94-8525-6c7a149a7f5c',
        date: new Date(
          Date.now() - (10 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Have we decided on the framework for the new project? I think it’s crucial to select a framework that aligns with our long-term goals and supports scalability.',
        ],
        senderId: usersData[2].id,
      },
      {
        id: 'baa0c23e-7d95-48a1-95b2-6f55e9f7aabe',
        date: new Date(
          Date.now() - (10 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Yes, we are going with React for the frontend. React provides a robust ecosystem and community support, which will be beneficial for our project.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '23483c02-20d8-4eb0-8be4-289c4de1d8c7',
        date: new Date(
          Date.now() - (10 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Great choice. What about the backend? We should consider factors like performance, scalability, and ease of maintenance when deciding on the backend technology.',
        ],
        senderId: usersData[2].id,
      },
      {
        id: '58c5431c-38e2-4882-8e13-9f1f4b8a2f22',
        date: new Date(
          Date.now() - (10 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'We will use Node.js with Express. Node.js offers non-blocking I/O operations, which will help us build a responsive and efficient backend for our application.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'a8b013aa-b7be-4534-aa4d-6b593b5dfe10',
        date: new Date(
          Date.now() - (10 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Sounds good. Let’s start setting up the project structure. We can create separate folders for frontend and backend, establish coding conventions, and define our initial project milestones.',
        ],
        senderId: usersData[2].id,
      },
    ],
  },
  {
    id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
    participants: [usersData[0], usersData[4]],
    lastMessage: {
      id: '5b73e68a-9e6f-4b57-aa70-670c63d60a5b',
      date: new Date(Date.now() - 15 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['Let’s simplify the checkout flow and run another test.'],
      senderId: usersData[4].id,
    },
    messages: [
      {
        id: '0e9d7bc7-c1c3-40a6-8f9c-d4a16c0a1769',
        date: new Date(
          Date.now() - (15 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['What did the analytics say about our last campaign?'],
        senderId: usersData[4].id,
      },
      {
        id: 'e4a27fa4-2c4f-4e3e-afe1-2ecba7ec1678',
        date: new Date(
          Date.now() - (15 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'We had a 20% increase in engagement but a drop in conversions.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '5e1c5c59-27a7-42a3-92b7-1e11ed03a49e',
        date: new Date(
          Date.now() - (15 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Interesting. Any thoughts on why conversions dropped?'],
        senderId: usersData[4].id,
      },
      {
        id: '20744b7a-9b91-4420-b2f8-6e32aeb8c4b3',
        date: new Date(
          Date.now() - (15 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'It could be due to the checkout process being too complicated.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '5b73e68a-9e6f-4b57-aa70-670c63d60a5b',
        date: new Date(
          Date.now() - (15 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Let’s simplify the checkout flow and run another test.'],
        senderId: usersData[4].id,
      },
    ],
  },
  {
    id: 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f',
    participants: [usersData[0], usersData[6]],
    lastMessage: {
      id: 'e4915e8d-e89c-4a3c-9a8d-3546a0a6e1f7',
      date: new Date(Date.now() - 18 * (60 * 60 * 1000 * 24)).toISOString(),
      content: [
        'I will schedule a meeting to discuss the performance optimization tasks and allocate resources accordingly.',
      ],
      senderId: usersData[0].id,
    },
    messages: [
      {
        id: 'f6f94ec5-c0f2-4e28-9865-1348e1c29391',
        date: new Date(
          Date.now() - (18 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['How should we prioritize the backlog for this sprint?'],
        senderId: usersData[0].id,
      },
      {
        id: '79fe7354-8f27-4c62-a3c8-3f7c7b73b8a0',
        date: new Date(
          Date.now() - (18 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'We should focus on the critical bugs and new feature requests.',
        ],
        senderId: usersData[6].id,
      },
      {
        id: 'a54b5b0b-7d6c-4e6b-a3f1-9378fa2e3693',
        date: new Date(
          Date.now() - (18 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Agreed. Let’s start with the bugs reported last week.'],
        senderId: usersData[0].id,
      },
      {
        id: '8a3c4e0b-0dc1-4fb2-9572-7fe4f3722ee8',
        date: new Date(
          Date.now() - (18 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['I will assign them to the team accordingly.'],
        senderId: usersData[6].id,
      },
      {
        id: '12fa0f6c-61b6-4804-b4d6-20bc5d376432',
        date: new Date(
          Date.now() - (18 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Should we also consider including performance optimizations in this sprint? It could improve our application speed and efficiency, especially for high-traffic scenarios.',
        ],
        senderId: usersData[6].id,
      },
      {
        id: '6a2993c8-8b1e-4c16-aa63-7229f25e7e7c',
        date: new Date(
          Date.now() - (18 * 24 + 0.7) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Yes, optimizing performance is crucial. We can prioritize tasks that address bottlenecks identified in our last performance review.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '3e3e7ef6-017e-45c3-a72b-11d5c200e933',
        date: new Date(
          Date.now() - (18 * 24 + 0.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Agreed. Let’s review the analytics data to pinpoint areas that need improvement and plan accordingly.',
        ],
        senderId: usersData[6].id,
      },
      {
        id: 'e4915e8d-e89c-4a3c-9a8d-3546a0a6e1f7',
        date: new Date(
          Date.now() - (18 * 24 + 0.3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I will schedule a meeting to discuss the performance optimization tasks and allocate resources accordingly.',
        ],
        senderId: usersData[0].id,
      },
    ],
  },
  {
    id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
    participants: [usersData[0], usersData[10]],
    lastMessage: {
      id: '59a3505a-6a89-4c6b-a572-baf582b4b8d2',
      date: new Date(Date.now() - 21 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['I will start the integration this afternoon.'],
      senderId: usersData[10].id,
    },
    messages: [
      {
        id: '3c5966f6-7f4d-4826-ba0d-b5bf8c22e9a0',
        date: new Date(
          Date.now() - (21 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Should we integrate a new payment gateway?'],
        senderId: usersData[10].id,
      },
      {
        id: '8b9181da-30e5-4ba7-bbcc-6abf399a9d2f',
        date: new Date(
          Date.now() - (21 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Yes, our current one has too many issues.'],
        senderId: usersData[0].id,
      },
      {
        id: 'f1c5a204-96b3-41f4-b9ef-01c83d53eae7',
        date: new Date(
          Date.now() - (21 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Which one are you considering?'],
        senderId: usersData[10].id,
      },
      {
        id: '7a477f23-55fe-4327-bba2-d5f50c6c1ec7',
        date: new Date(
          Date.now() - (21 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Stripe seems to be a reliable option.'],
        senderId: usersData[0].id,
      },
      {
        id: '59a3505a-6a89-4c6b-a572-baf582b4b8d2',
        date: new Date(
          Date.now() - (21 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['I will start the integration this afternoon.'],
        senderId: usersData[10].id,
      },
    ],
  },
  {
    id: 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b',
    participants: [usersData[0], usersData[11]],
    lastMessage: {
      id: '73f9e3b6-05ce-4707-a43b-6c4e24b6996b',
      date: new Date(Date.now() - 24 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['I will schedule the deployment for tomorrow.'],
      senderId: usersData[11].id,
    },
    messages: [
      {
        id: '9f45df0f-cf48-46ea-ba47-c4b506ca0e03',
        date: new Date(
          Date.now() - (24 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['How did the A/B test results turn out?'],
        senderId: usersData[0].id,
      },
      {
        id: 'c35395d8-7f52-4e08-9d19-6f4e39f25fb1',
        date: new Date(
          Date.now() - (24 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Version B had a higher conversion rate by 15%.'],
        senderId: usersData[11].id,
      },
      {
        id: '6a92e20e-ae0b-4f4f-97f7-d3f2a88dd989',
        date: new Date(
          Date.now() - (24 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['That’s great! We should implement it site-wide.'],
        senderId: usersData[0].id,
      },
      {
        id: '73f9e3b6-05ce-4707-a43b-6c4e24b6996b',
        date: new Date(
          Date.now() - (24 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['I will schedule the deployment for tomorrow.'],
        senderId: usersData[11].id,
      },
    ],
  },
  {
    id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
    participants: [usersData[0], usersData[1]],
    lastMessage: {
      id: '85df3c6e-7a2c-4e0b-9c19-c0b4c6c2e4d9',
      date: new Date(Date.now() - 24 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ['The final design for the app dashboard is ready for review.'],
      senderId: usersData[11].id,
    },
    messages: [
      {
        id: '1a34df0f-cf48-46ea-ba47-c4b506ca0e03',
        date: new Date(
          Date.now() - (24 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Have we finalized the user flow for the login process?'],
        senderId: usersData[0].id,
      },
      {
        id: 'c35395d8-7f52-4e08-9d19-6f4e39f25fb1',
        date: new Date(
          Date.now() - (24 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Yes, we decided to go with the biometric authentication as well.',
        ],
        senderId: usersData[1].id,
      },
      {
        id: '6a92e20e-ae0b-4f4f-97f7-d3f2a88dd989',
        date: new Date(
          Date.now() - (24 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: ['Great, that should improve user security significantly.'],
        senderId: usersData[0].id,
      },
      {
        id: '3b59e2b7-05ce-4707-a43b-6c4e24b6996b',
        date: new Date(
          Date.now() - (24 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'The testing team reported some issues with the transaction history feature.',
        ],
        senderId: usersData[1].id,
      },
      {
        id: '4c78e2e8-05ce-4707-a43b-6c4e24b6996b',
        date: new Date(
          Date.now() - (24 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'I can look into that tomorrow. Meanwhile, let’s ensure the notifications are working.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '5d89f3f9-05ce-4707-a43b-6c4e24b6996b',
        date: new Date(
          Date.now() - (24 * 24 + 0.7) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Notifications should be triggered on any account activity changes.',
        ],
        senderId: usersData[1].id,
      },
      {
        id: '6e90g4g0-05ce-4707-a43b-6c4e24b6996b',
        date: new Date(
          Date.now() - (24 * 24 + 0.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Let’s make sure the deposit feature is seamless across devices.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '85df3c6e-7a2c-4e0b-9c19-c0b4c6c2e4d9',
        date: new Date(
          Date.now() - (24 * 24 + 0.3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'The final design for the app dashboard is ready for review.',
        ],
        senderId: usersData[1].id,
      },
    ],
  },
  {
    id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
    participants: [usersData[0], usersData[12]],
    lastMessage: {
      id: '9b73f0c8-d31c-4a78-b5d3-4d8f1a4fc4c2',
      date: new Date(Date.now() - 27 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ["Perfect! I'll update the documentation with these changes."],
      senderId: usersData[12].id,
    },
    messages: [
      {
        id: '7d234af9-8e43-4ae2-b018-1a89d4a1c90f',
        date: new Date(
          Date.now() - (27 * 24 + 2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "Hi Lucie, I've been reviewing our API documentation and noticed some inconsistencies. Should we schedule a meeting to discuss updates?",
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'e5c67891-f23d-48a6-95c3-8d12e5a784b2',
        date: new Date(
          Date.now() - (27 * 24 + 1.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "Yes, I've noticed that too. The authentication section particularly needs a refresh since we implemented OAuth2.",
        ],
        senderId: usersData[12].id,
      },
      {
        id: 'b4a92ed5-1b8f-4d88-9c2a-ff5e4a3c1d6b',
        date: new Date(
          Date.now() - (27 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Exactly. We should also add examples for the new endpoints we deployed last month.',
          'Do you think we should include Postman collections as well?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '3f8e4d91-c256-4b17-a634-ce89d2b6592a',
        date: new Date(
          Date.now() - (27 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'That would be really helpful for the developers. We could also add curl examples for those who prefer command line testing.',
        ],
        senderId: usersData[12].id,
      },
      {
        id: 'a4b92c67-d345-4e89-b91f-2c8a4d6f3b2e',
        date: new Date(
          Date.now() - (27 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "I'll start working on the OpenAPI specifications.",
          "Could you review the authentication and error handling sections once I'm done?",
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'f7e9d2c1-b456-4a78-9c3d-5e2f1a8b4d6c',
        date: new Date(Date.now() - 27 * 24 * (60 * 60 * 1000)).toISOString(),
        content: ["I'll update the documentation with these changes."],
        senderId: usersData[12].id,
      },
    ],
  },
  {
    id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
    participants: [usersData[0], usersData[13]],
    lastMessage: {
      id: 'f6c9d824-3e51-47d2-b8a1-2b4e9a7d5c3f',
      date: new Date(Date.now() - 30 * (60 * 60 * 1000 * 24)).toISOString(),
      content: ["I'll prepare the presentation for next week's demo then."],
      senderId: usersData[13].id,
    },
    messages: [
      {
        id: '2c8b49f5-a147-4d3b-9e2d-1f8c6b4a7d3e',
        date: new Date(
          Date.now() - (30 * 24 + 3.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "How's the progress on the new analytics dashboard coming along?",
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'a1e5d9c3-b847-4f62-9d1a-8c4b3e2f5d9a',
        date: new Date(
          Date.now() - (30 * 24 + 2.8) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "It's going well! I've implemented the real-time data tracking feature and the custom chart components.",
          'Would you like to see a demo?',
        ],
        senderId: usersData[13].id,
      },
      {
        id: '7f1e9d2c-4b8a-4f3e-9c6b-2d5a8e4f3b2a',
        date: new Date(
          Date.now() - (30 * 24 + 2.3) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Yes, that would be great. Are all the metrics we discussed included?',
          'Especially the user engagement tracking?',
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'c4d8e2a1-9f6b-4c7d-8e5a-3b2f1d9c4e8a',
        date: new Date(
          Date.now() - (30 * 24 + 1.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "I've added user engagement metrics with heat maps and session duration analytics.",
          'The export functionality is also ready.',
        ],
        senderId: usersData[13].id,
      },
      {
        id: '9e8d7c6b-5a4f-3e2d-1c8b-7a6f5d4e3c2b',
        date: new Date(
          Date.now() - (30 * 24 + 1.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Excellent! What about the custom date range selector?',
          'That was a key requirement from the marketing team.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '2b1a9c8d-7e6f-4d5e-3c2b-1a8f7d6e5c4a',
        date: new Date(
          Date.now() - (30 * 24 + 1.2) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'The date range selector is implemented with presets for common ranges.',
          'Users can also select custom dates and compare periods.',
        ],
        senderId: usersData[13].id,
      },
      {
        id: '5f4e3d2c-1b8a-7c6d-9e8f-2d1c4b3a5e9d',
        date: new Date(
          Date.now() - (30 * 24 + 0.9) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          'Perfect! Have you tested it with large datasets?',
          'We need to ensure it performs well with historical data.',
        ],
        senderId: usersData[0].id,
      },
      {
        id: '8c7b6a5d-4e3f-2d1c-9b8a-7f6e5d4c3b2a',
        date: new Date(
          Date.now() - (30 * 24 + 0.7) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "I've implemented data pagination and lazy loading for better performance.",
          'It handles millions of records smoothly.',
        ],
        senderId: usersData[13].id,
      },
      {
        id: 'b8c4e2a1-9f67-4d23-8b5a-1c7d9e6f3a2d',
        date: new Date(
          Date.now() - (30 * 24 + 0.5) * (60 * 60 * 1000),
        ).toISOString(),
        content: [
          "That's great work! When can we demo this to the stakeholders?",
        ],
        senderId: usersData[0].id,
      },
      {
        id: 'd5e7f9c2-1a3b-4d8e-9f6a-2b4c7d8e5a3f',
        date: new Date(Date.now() - 30 * 24 * (60 * 60 * 1000)).toISOString(),
        content: ["I'll prepare the presentation for next week's demo then."],
        senderId: usersData[13].id,
      },
    ],
  },
];
