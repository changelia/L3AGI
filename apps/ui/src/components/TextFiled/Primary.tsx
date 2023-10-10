import TextField from '@l3-lib/ui-core/dist/TextField'
import { useTheme } from 'styled-components'

export default function PrimaryTextFiled(props: any) {
  const theme = useTheme()
  return <TextField {...props} color={theme.textFiled.primary} />
}
