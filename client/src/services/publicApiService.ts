/* Application Modules */
import { BASE_URL } from "../config/AppConfig";

export const addUserToProject = async (userId: string, projectId: string) => {
  try {
    const reqURL = `${BASE_URL}/project-invitations/`;

    const requestData = {
      user_id: userId,
      project_id: String(projectId)
    };

    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    }

    const response = await fetch(reqURL, requestOption);
    const result = await response.json();

    if (response.ok && result.status === "Success") {
      return result;
    }

    throw new Error(result.message || 'Failed to add user to project');
  } catch (error: any) {
    throw new Error(`Failed to add user to project: ${error.message}`);

  }
}