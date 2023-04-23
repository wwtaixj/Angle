import { lStorage } from '@renderer/utils/webStorage';

const LOCAL_NAME = 'promptStore';

export type PromptList = [];

export interface PromptStore {
	promptList: PromptList;
}

export function getLocalPromptList(): PromptStore {
	const promptStore: PromptStore | undefined = lStorage.get(LOCAL_NAME);
	return promptStore ?? { promptList: [] };
}

export function setLocalPromptList(promptStore: PromptStore): void {
	lStorage.set(LOCAL_NAME, promptStore);
}
