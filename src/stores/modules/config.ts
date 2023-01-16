import { defineStore } from 'pinia'
import type { LanguageType, SizeType, MenuModeType } from '#/config'
import { changeComponentTheme } from '@/hooks/web/useComponentTheme'
import { changeTopbarTheme } from '@/hooks/web/useTopbarTheme'
interface ConfigState {
  language: LanguageType
  size: SizeType
  sideMenu: boolean
  menuMode: MenuModeType
  componentTheme: string
  topbarTheme: string
}

export const useConfigStore = defineStore('app-config', {
  state: (): ConfigState => ({
    language: 'zh-cn',
    size: 'default',
    sideMenu: true,
    menuMode: 'default',
    componentTheme: '#409EFF',
    topbarTheme: '#FFFFFF'
  }),
  getters: {
    getLanguageConfig(): LanguageType {
      return this.language
    },
    getSizeConfig(): SizeType {
      return this.size
    },
    getSideMenuConfig(): boolean {
      return this.sideMenu
    },
    getMenuModeConfig(): MenuModeType {
      return this.menuMode
    },
    menuModeIsDefault(): boolean {
      return this.menuMode === 'default'
    },
    menuModeIsOverlay(): boolean {
      return this.menuMode === 'overlay'
    },
    menuModeIsHorizontal(): boolean {
      return this.menuMode === 'horizontal'
    },
    getComponentTheme(): string {
      return this.componentTheme
    },
    getTopbarTheme(): string {
      return this.topbarTheme
    }
  },
  actions: {
    setLanguageConfig(val: LanguageType) {
      this.language = val
    },
    setSizeConfig(val: SizeType) {
      this.size = val
    },
    setSideMenuConfig(val: boolean) {
      this.sideMenu = val
    },
    setMenuModeConfig(val: MenuModeType) {
      this.menuMode = val
    },
    toggleSideMenu() {
      this.setSideMenuConfig(!this.sideMenu)
    },
    setComponentTheme(val: string) {
      this.componentTheme = val
    },
    setTopbarTheme(val: string) {
      this.topbarTheme = val
    }
  },
  persist: {
    afterRestore: ({ store }) => {
      // 恢复自定义主题色
      changeComponentTheme(store.componentTheme)
      // 恢复顶栏主题色
      changeTopbarTheme(store.topbarTheme)
    }
  }
})
