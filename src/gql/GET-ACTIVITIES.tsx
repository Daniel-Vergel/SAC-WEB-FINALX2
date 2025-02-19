import { gql } from "@apollo/client";

export const GET_CURRENT_ACTIVITIES = gql`
  query GetCurrentActivities($where: ActivityViewWhere, $pagination: Pagination) {
    getCurrentActivities(where: $where, pagination: $pagination) {
      id
      bitCode
      activityCode
      bitTicket
      bitStatus
      productCode
      productName
      clientName
      bitRadChannel
      clientCode
      assignedDate
      assignedHour
      assignedDateHour
      statusDate
      receivedDate
      createdDate
      createdIp
      createdUserId
      createdUserNickname
      description
      publicDescription
      executorCode
      executorName
      executorSurname
      executorFullName
      personEmail
      personUsername
      lastExecutorDate
      serialAnnex
      isSecure
      secureOrder
      state
      isState
      isEditable
      isPartial
      isAssembly
      isRedmine
      isReassigned
      caseCode
      caseDescription
      itemCode
      itemDescription
      itemParentCode
      itemParentDescription
      solutionType
      historyCreatedDate
      hoursRemaining
      maxAccumulatedHours
      remainingTime
      remainingPercentage
      assignedDateTime
      answerStartDate
      isDaily
    }
  }
`;
