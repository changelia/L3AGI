import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { AuthContext } from 'contexts'
import { useModal } from 'hooks'
import AgentCard from 'pages/Agents/AgentCard'
import { StyledCardsWrapper } from 'pages/Agents/Agents'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import Toolkit from 'pages/Toolkit'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useMarketplace } from './useMarketplace'

const Marketplace = () => {
  const { user } = React.useContext(AuthContext)

  const navigate = useNavigate()

  const { openModal } = useModal()

  const { systemAgents, templateAgents } = useMarketplace()

  const handleChatClick = (agentId: string) => {
    if (!user) {
      openModal({ name: 'login-modal' })
    } else {
      navigate(`/copilot?agent=${agentId}`)
    }
  }

  const handleViewClick = (agentId: string) => {
    if (!user) {
      openModal({ name: 'login-modal' })
    } else {
      navigate(`/agents/${agentId}`)
    }
  }

  return (
    <StyledRoot>
      <StyledSectionWrapper>
        <StyledHeaderGroup className='header_group'>
          <div>
            <StyledSectionTitle>Top-tier AI Thinkers</StyledSectionTitle>
            <StyledSectionDescription>
              Discover the foremost minds shaping AI's future with their innovative ideas
            </StyledSectionDescription>
          </div>
        </StyledHeaderGroup>
        <ComponentsWrapper noPadding>
          <StyledCardsWrapper>
            {systemAgents?.map((agentObj: any, index: number) => {
              const { agent, configs } = agentObj

              return (
                <AgentCard
                  key={index}
                  name={agent.name}
                  description={agent.description}
                  onViewClick={() => handleViewClick(agent.id)}
                  onChatClick={() => handleChatClick(agent.id)}
                  headerTag={agent.role}
                />
              )
            })}
          </StyledCardsWrapper>
        </ComponentsWrapper>
      </StyledSectionWrapper>

      {templateAgents?.length > 0 && (
        <StyledSectionWrapper>
          <StyledHeaderGroup className='header_group'>
            <div>
              <StyledSectionTitle>
                Evolving AI Virtuosos: Powered by the Community
              </StyledSectionTitle>
              <StyledSectionDescription>
                Witness the growth of exceptional AI talents, nurtured by collective community
                contributions.
              </StyledSectionDescription>
            </div>
          </StyledHeaderGroup>
          <ComponentsWrapper noPadding>
            <StyledCardsWrapper>
              {templateAgents?.map((agentObj: any, index: number) => {
                const { agent, configs } = agentObj

                return (
                  <AgentCard
                    key={index}
                    name={agent.name}
                    description={agent.description}
                    onViewClick={() => handleViewClick(agent.id)}
                    onChatClick={() => handleChatClick(agent.id)}
                    headerTag={agent.role}
                  />
                )
              })}
            </StyledCardsWrapper>
          </ComponentsWrapper>
        </StyledSectionWrapper>
      )}

      {!user && <Toolkit isPublic />}
    </StyledRoot>
  )
}

export default Marketplace

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
`
