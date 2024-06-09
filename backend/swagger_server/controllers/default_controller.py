import connexion
import six

from swagger_server.models.inline_response200 import InlineResponse200  # noqa: E501
from swagger_server.models.user_create import UserCreate  # noqa: E501
from swagger_server.models.user_login import UserLogin  # noqa: E501
from swagger_server.models.user_response import UserResponse  # noqa: E501
from swagger_server import util


def users_login_post(body):  # noqa: E501
    """Authenticate a user

     # noqa: E501

    :param body: User credentials for authentication
    :type body: dict | bytes

    :rtype: InlineResponse200
    """
    if connexion.request.is_json:
        body = UserLogin.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def users_post(body):  # noqa: E501
    """Create a new user

     # noqa: E501

    :param body: User object that needs to be created
    :type body: dict | bytes

    :rtype: UserResponse
    """
    if connexion.request.is_json:
        body = UserCreate.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def users_top_get():  # noqa: E501
    """Get the top 10 users with the highest scores

     # noqa: E501


    :rtype: List[UserResponse]
    """
    return 'do some magic!'
