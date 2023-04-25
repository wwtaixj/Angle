<template>
	<Layout class="home">
		<LayoutSider v-model:collapsed="collapsed" class="sider" :trigger="null" collapsible>
			<div class="logo">
				<Space :size="4">
					<iconAixin1 v-show="!collapsed" size="30px" />
					<iconArtboard v-show="!collapsed" size="30px" />
					<iconHuluobu v-show="!collapsed" size="30px" />
					<iconShouhuituzi size="30px" />
				</Space>
			</div>
			<homeMenu />
		</LayoutSider>
		<Layout>
			<LayoutHeader class="header">
				<menu-unfold-outlined
					v-if="collapsed"
					class="trigger"
					@click="() => (collapsed = !collapsed)"
				/>
				<menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
				<XAvatar class="user-avatar" />
			</LayoutHeader>
			<LayoutContent class="content">
				<router-view v-slot="{ Component, route }">
					<keep-alive>
						<component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath">
						</component>
					</keep-alive>
					<component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
				</router-view>
			</LayoutContent>
		</Layout>
		<div class="small-menu">
			<Dropdown v-model:visible="smallMenuVisible" :trigger="['click']" placement="top">
				<span
					class="small-menu-icon animation-rubberBand ant-avatar ant-avatar-circle ant-avatar-icon"
				>
					<Transition>
						<FrownTwoTone v-show="!smallMenuVisible" />
					</Transition>
					<Transition>
						<SmileTwoTone v-show="smallMenuVisible" two-tone-color="#eb2f96" />
					</Transition>
				</span>
				<template #overlay>
					<homeMenu
						:menu-config="{
							mode: 'inline',
							theme: 'light'
						}"
						small-menu
					/>
				</template>
			</Dropdown>
		</div>
	</Layout>
</template>
<script lang="ts" setup>
import { Layout, LayoutSider, LayoutHeader, LayoutContent, Dropdown, Space } from 'ant-design-vue';
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	FrownTwoTone,
	SmileTwoTone
} from '@ant-design/icons-vue';
import XAvatar from './children/XAvatar.vue';
import iconAixin1 from '@renderer/components/iconfont/iconAixin1.vue';
import iconArtboard from '@renderer/components/iconfont/iconArtboard.vue';
import iconHuluobu from '@renderer/components/iconfont/iconHuluobu.vue';
import iconShouhuituzi from '@renderer/components/iconfont/iconShouhuituzi.vue';
import homeMenu from './children/homeMenu.vue';
import { ref } from 'vue';

const collapsed = ref(false);
const smallMenuVisible = ref(false);
</script>
<style lang="less" scoped>
.home {
	height: 100%;
	.header {
		background: #fff;
		padding: 0;
		.user-avatar {
			position: absolute;
			top: 0;
			right: 2rem;
		}
	}
	.content {
		margin: 20px 16px;
		background: #fff;
		min-height: 280px;
	}
	.small-menu {
		display: none !important;
	}
	.trigger {
		font-size: 18px;
		line-height: 64px;
		padding: 0 24px;
		cursor: pointer;
		transition: color 0.3s;
	}

	.trigger:hover {
		color: #1890ff;
	}

	.logo {
		height: 32px;
		background: rgba(255, 255, 255, 0.3);
		margin: 16px;
	}

	@media screen and(max-width: 750px) {
		.sider {
			display: none;
		}
		.header {
			display: none;
		}
		.content {
			margin: 0 !important;
		}
	}
}
</style>
