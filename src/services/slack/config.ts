export const getTextBlock = (userId: string) => {
  const texts = [
    `👋 Hi there! <@${userId}> will be helping out with support matters during this week. Please feel free to tag him in case of an urgency.`,
    `🪴 New week ahead! Good luck <@${userId}>  on your Goalie duty. Make sure to enable notifications for the <broadcast_channel> and update any of your necessary JIRA tickets.`,
  ];

  const text_block = {
    attachments: [
      {
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: texts[Math.floor(Math.random() * texts.length + 1)],
            },
          },
        ],
      },
    ],
  };

  return text_block;
};
