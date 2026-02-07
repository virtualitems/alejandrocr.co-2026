import { useMemo } from 'react'
import { useLocation } from 'react-router'
import type { NavigationItem } from '../types/navigation'

export function useNavigation(navigation: NavigationItem[]) {
  const location = useLocation()

  const updatedNavigation = useMemo(() => {
    return navigation.map(item => ({
      ...item,
      current: item.href === location.pathname
    }))
  }, [navigation, location.pathname])

  return updatedNavigation
}
