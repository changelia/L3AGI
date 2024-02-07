import { StyledSearchOutlineIcon } from 'components/ChatSwitcher/ChatSwitcher'
import TypographyPrimary from 'components/Typography/Primary'
import { useModal } from 'hooks'
import { t } from 'i18next'
import { useAgentForm } from 'pages/Agents/AgentForm/useAgentForm'
import { StyledDetailsBox } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { useEditAgent } from 'pages/Agents/useEditAgent'
import { toolLogos } from 'pages/Toolkit/constants'
import { voiceLogos } from 'plugins/contact/pages/Voice/constants'
import { Search } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Typography from 'share-ui/components/typography/Typography'
import styled from 'styled-components'
import { AgentWithConfigs } from 'types'

const IntegrationDetails = () => {
  const { openModal } = useModal()

  const {
    voiceSynthesizerOptions,
    voiceTranscriberOptions,
    toolOptions,
    tools: toolsData,
    voices: voicesData,
  } = useAgentForm({})

  const { agentById } = useEditAgent()

  const synthesizerId = agentById?.configs?.synthesizer
  const transcriberId = agentById?.configs?.transcriber
  const toolIds = agentById?.configs?.tools

  const synthesizer = voiceSynthesizerOptions?.find((option: any) => option.value === synthesizerId)
  const transcriber = voiceTranscriberOptions?.find((option: any) => option.value === transcriberId)
  const tools = toolOptions.filter((option: any) => toolIds?.includes(option.value))

  const synthesizerLogo =
    voiceLogos?.find((voice: any) => voice.voiceName === synthesizer?.label)?.logoSrc || ''

  const transcriberLogo =
    voiceLogos?.find((voice: any) => voice.voiceName === transcriber?.label)?.logoSrc || ''

  const toolSlugs = toolsData?.map((tool: any) => {
    return { slug: tool.slug, id: tool.toolkit_id }
  })
  const voiceSlugs = voicesData?.map((voice: any) => {
    return { slug: voice.slug, id: voice.id }
  })

  const handleOpenVoiceIntegrationModal = (id: string) => {
    const slug = voiceSlugs?.find((slug: any) => slug.id === id)?.slug
    openModal({ name: 'voice-modal', data: { voiceSlug: slug } })
  }

  const handleOpenToolIntegrationModal = (id: string) => {
    const slug = toolSlugs?.find((slug: any) => slug.id === id)?.slug
    openModal({ name: 'toolkit-modal', data: { toolSlug: slug } })
  }

  return (
    <StyledDetailsBox>
      <StyledDetailHeader>
        <TypographyPrimary
          value={t('integrations')}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
        />
        <IconButton
          onClick={() => openModal({ name: 'integration-list-modal' })}
          icon={() => <StyledSearchOutlineIcon size={26} />}
          kind={IconButton.kinds?.TERTIARY}
          size={IconButton.sizes?.SMALL}
        />
      </StyledDetailHeader>

      <StyledCardsWrapper>
        {synthesizer && (
          <StyledIntegrationCard onClick={() => handleOpenVoiceIntegrationModal(synthesizer.value)}>
            <StyledImg src={synthesizerLogo} />

            <TypographyPrimary
              value={synthesizer?.label}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />
          </StyledIntegrationCard>
        )}
        {transcriber && (
          <StyledIntegrationCard onClick={() => handleOpenVoiceIntegrationModal(transcriber.value)}>
            <StyledImg src={transcriberLogo} />

            <TypographyPrimary
              value={transcriber?.label}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />
          </StyledIntegrationCard>
        )}

        {tools?.map((tool: any) => {
          const filteredLogos = toolLogos.filter(
            (toolLogo: any) => toolLogo.toolName === tool.label,
          )

          const logoSrc = filteredLogos?.[0]?.logoSrc || ''
          return (
            <StyledIntegrationCard
              key={tool?.value}
              onClick={() => handleOpenToolIntegrationModal(tool?.value)}
            >
              <StyledImg src={logoSrc} />

              <TypographyPrimary
                value={tool.label}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledIntegrationCard>
          )
        })}
      </StyledCardsWrapper>
    </StyledDetailsBox>
  )
}

export default IntegrationDetails

export const StyledIntegrationCard = styled.div`
  display: flex;
  align-items: center;

  gap: 4px;

  padding: 5px;
  border-radius: 8px;

  :hover {
    background: ${({ theme }) => theme.body.teamChatCardSelectedColor};
    cursor: pointer;
  }
`

export const StyledImg = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 4px;
`
export const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const StyledDetailHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-weight: 700;
`
