import { MenuItemProps, TabPaneProps } from 'ant-design-vue';

export interface XMenuItem extends MenuItemProps {
	key: string;
}

export interface TabsPaneItem extends TabPaneProps {
	name: string;
	key: string;
}
