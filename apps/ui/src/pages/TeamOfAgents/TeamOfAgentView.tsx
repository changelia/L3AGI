import BackButton from 'components/BackButton'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledDetailsBox,
  StyledDivider,
  StyledInnerButtonWrapper,
  StyledInnerWrapper,
  StyledLeftColumn,
  StyledRightColumn,
  StyledWrapper,
} from 'pages/Agents/AgentView/AgentView'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import { useParams } from 'react-router-dom'
import { useTeamOfAgentsByIdService } from 'services/team/useTeamOfAgentsByIdService'

import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Button from '@l3-lib/ui-core/dist/Button'

import Download from '@l3-lib/ui-core/dist/icons/Download'

import TagsRow from 'pages/Agents/AgentView/components/TagsRow'

import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'

const TeamOfAgentView = ({ teamOfAgentsData }: { teamOfAgentsData?: any }) => {
  const { teamId } = useParams()
  const { data } = useTeamOfAgentsByIdService({ id: teamId })

  if (!data && !teamOfAgentsData) return <div />

  const { name, description, team_type, team_agents } = data || teamOfAgentsData

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        {!teamOfAgentsData && (
          <>
            <div>
              <>
                <StyledSectionTitle>Agent</StyledSectionTitle>
                <StyledSectionDescription>
                  Witness the growth of exceptional AI talents, nurtured by collective community
                  contributions.
                </StyledSectionDescription>
              </>
            </div>

            <div>
              <BackButton />
            </div>
          </>
        )}
      </StyledHeaderGroup>
      <ComponentsWrapper noPadding hideBox={teamOfAgentsData}>
        <StyledInnerWrapper noPadding={teamOfAgentsData}>
          <StyledLeftColumn>
            <StyledDetailsBox>
              <StyledWrapper>
                <Typography
                  value={name}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'#FFF'}
                />

                <div>
                  <Button
                    size={Button.sizes.SMALL}
                    // onClick={() => navigate(`/agents/create-agent?agentId=${agentId}`)}
                  >
                    <StyledInnerButtonWrapper>
                      <Download size={28} />
                      Add
                    </StyledInnerButtonWrapper>
                  </Button>
                </div>
              </StyledWrapper>

              {description && (
                <>
                  <StyledDivider />

                  <StyledWrapper>
                    <Typography
                      value={description}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'rgba(255,255,255,0.9)'}
                    />
                  </StyledWrapper>
                </>
              )}

              <StyledDivider />

              <StyledWrapper>
                {team_type && <TagsRow title='Team Type' items={[team_type]} />}
              </StyledWrapper>
            </StyledDetailsBox>
          </StyledLeftColumn>

          <StyledRightColumn>
            <StyledAgentsWrapper>
              <Typography
                value={'Agents'}
                type={Typography.types.LABEL}
                size={Typography.sizes.lg}
                customColor={'#FFF'}
              />

              {team_agents?.map((agentObj: any, index: number) => {
                const { agent, role } = agentObj

                return (
                  <StyledAgent key={index}>
                    <AvatarGenerator name={agent.name} size={40} />

                    <StyledMainTextWrapper>
                      <Typography
                        value={agent.name}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.sm}
                        customColor={'#FFF'}
                      />
                      <Typography
                        value={agent.role}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.xss}
                        customColor={'rgba(255,255,255,0.8'}
                      />
                    </StyledMainTextWrapper>

                    <Tags label={role} readOnly size='small' outlined />
                  </StyledAgent>
                )
              })}
            </StyledAgentsWrapper>
          </StyledRightColumn>
        </StyledInnerWrapper>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default TeamOfAgentView

const StyledAgentsWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);

  width: 100%;
  max-width: 1440px;
  /* min-height: 400px; */

  border-radius: 10px;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledAgent = styled.div`
  display: flex;

  align-items: center;

  gap: 6px;
`
const StyledMainTextWrapper = styled.div`
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* gap: 10px; */
  margin-right: auto;
  /* width: 100%; */
  /* max-width: 400px; */
`
