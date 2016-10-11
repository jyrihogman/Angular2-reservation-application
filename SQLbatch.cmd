echo Creating SQL database

sqlcmd -E -S localhost -i %__CD__%SQLCreateDb.sql 

