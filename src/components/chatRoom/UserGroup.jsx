import React from 'react'
import PropTypes from 'prop-types'
import {AvatarGroup, Avatar} from '@chakra-ui/react'

function UserGroup({users}) {
    return (
        <AvatarGroup max={2} size="sm">
            {
                users && users.map((value, key)=> {
                    return <Avatar key={key} src={value.photoURL} name={value.displayName}/>
                })
            }
        </AvatarGroup>
    )
}

UserGroup.propTypes = {
    users: PropTypes.array.isRequired
}

export default UserGroup

