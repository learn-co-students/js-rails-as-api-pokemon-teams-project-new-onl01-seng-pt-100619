# -*- makefile -*-
#
# Makefile for msvc
#

# Tack the extra deps onto the autogenerated variables
INCFLAGS = -I$(LIBFFI_BUILD_DIR)/include -I$(LIBFFI_BUILD_DIR)/src/x86 $(INCFLAGS)
LOCAL_LIBS = $(LOCAL_LIBS) $(LIBFFI)
BUILD_DIR = $(MAKEDIR)
LIBFFI_BUILD_DIR = $(BUILD_DIR)/libffi

!IF "$(srcdir)" == "."
LIBFFI_SRC_DIR = $(MAKEDIR)/libffi
!ELSE
LIBFFI_SRC_DIR = $(srcdir)/libffi
!ENDIF

LIBFFI = $(LIBFFI_BUILD_DIR)/.libs/libffi_convenience.lib

$(OBJS):	$(LIBFFI)

$(LIBFFI):		
	@$(MAKEDIRS) $(LIBFFI_BUILD_DIR)
	@cd $(LIBFFI_BUILD_DIR) && $(MAKE) -f Makefile.vc64
	

