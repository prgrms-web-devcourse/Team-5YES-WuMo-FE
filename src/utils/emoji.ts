import { categoryInfo } from './constants/place';

export const getGitEmoji = (category: string) => {
  console.log(category);

  const gitEmojiID = Object.keys(categoryInfo).includes(category)
    ? categoryInfo[category].imageID
    : category;
  return `https://github.githubassets.com/images/icons/emoji/unicode/${gitEmojiID}.png?v8`;
};
