import { Layout } from '../layouts/1-column'
import { CameraDetector } from '../components/inspector/camera-detector'

type Props = {
  navigation: { name: string; href: string; current: boolean }[]
}

export function InspectorPage({ navigation }: Props) {
  return (
    <Layout
      columnTitle="Inspector"
      columnNode={<CameraDetector />}
      columnWidth="5xl"
      navigation={navigation}
    />
  )
}
