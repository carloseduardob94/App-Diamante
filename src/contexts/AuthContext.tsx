import { ReactNode, createContext, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { storageUserGet, storageUserRemove } from "../storage/storageUser";
import { storageAuthTokenRemove } from "../storage/storageAuthToken";



export type AuthContextDataProps = {
  user: UserDTO
  listApolices: UserDTO[]
  loadingUserStorageData: boolean
  signIn: (cpf: string, nascimento: string) => Promise<void>
  signOut: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [listApolices, setListApolices] = useState<UserDTO[]>([])
  const [loadingUserStorageData, setLoadingUserStorageData] = useState(true)

  const signIn = async (cpf: string, nascimento: string) => {

    try {
      const { data } = await api.post('/documents-multi-tenant', { cpf, nascimento }, {
        headers: {
          'Authorization': 'Bearer 5-e6SF7VWTJ_AxK3r3wT6gYy_w_rBg1i'
        }
      })

      if (data.records) {
        setListApolices(data.records)

        setUser(data.records[0])
        console.log(data.records[0])
        // storageUserSave(data.records[0])
      }

    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      setLoadingUserStorageData(true)
      setUser({} as UserDTO)

      await storageUserRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error

    } finally {
      setLoadingUserStorageData(false)

    }
  }

  async function loadUserData() {
    try {
      const userLogged: UserDTO = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
      }

    } catch (error) {
      throw error

    } finally {
      setLoadingUserStorageData(false)

    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loadingUserStorageData, listApolices }}>
      {children}
    </AuthContext.Provider>
  )
}