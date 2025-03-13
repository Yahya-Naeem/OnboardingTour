//add user onboarding task steps here : if action == type then find the value from user logs table . If not then add event listener and move the button to next step
export const ONBOARD_TASK_STEPS_BY_PAGE = {
    'learn': {
        step1: [
            {
                title: 'Reading',
                id: "reading-content",
                content: "Read the text click on any word you don't understand and add them to My Words",
                action: 'reading',
                //children: ["reading-audio", "reading-text"] // Optional: Explicitly define nested elements
            },
            {
                title: 'Goals',
                id: "my-words-box",
                content: 'Click the word you just added to your word card.',
                action: ''
            },
            {
                title: 'Question',
                id: ["reading-question", "reading-answer","reading-action"],
                content: 'Read the question and select your answer',
                action: ''
            },
            {
                title: 'Step 1 Completed',
                id: "",
                content: "Well done, you have completed your first exercise. Let's try another",
                action: ''
            }
        ],
        step2: [
            {
                title: 'Step 2 Completed',
                id: "",
                content: "Well done, you have completed your onboarding task",
                action: 'answer-submission'
            }
        ]
    },
    'vision':{
        step1:[
            {
                title: 'Vision',
                id: ["img-icon",'image-upload-action'],
                content: "Click on Upload new image to upload new image",
                action: 'vision'
            },
            {
                title: 'Goals',
                id: "image-learn-action",
                content: 'Click learn to see the image translation',
                action: ''
            },
            {
                title: 'Step 1 Completed',
                id: "image-slider",
                content: "The image you uploaded is saved , click to open it",
                action: ''
            }
        ]
    },
    'topics':{
        step1:[
            {
                title: 'Topics',
                id: ["topic-icon",'topic-action'],
                content: "Click on any topic to start learning",
                action: 'topics'
            },
            {
                title: 'Goals',
                id: "topic-learn-action",
                content: 'Click learn to see the topic translation',
                action: ''
            },
            {
                title: 'Step 1 Completed',
                id: "topic-slider",
                content: "The topic you selected is saved , click to open it",
                action: ''
            }
        ]
    }
};